import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.interface';
import UserEntity from '../models/user.entity';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private authService: AuthService
  ) {}

  create(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.firstName = user.firstName;
        newUser.lastName = user.lastName;
        newUser.email = user.email;
        newUser.password = passwordHash;

        return from(this.usersRepository.save(newUser)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          }),
          catchError((err) => throwError(err))
        );
      })
    );
    // return from(this.usersRepository.save(user));
  }

  findOne(id: number): Observable<User> {
    return from(this.usersRepository.findOne({ id })).pipe(
      map((user: User) => {
        const { password, ...result } = user;
        return result;
      })
    );
  }

  findAll(): Observable<User[]> {
    return from(this.usersRepository.find()).pipe(
      map((users: User[]) => {
        users.forEach(function (v) {
          delete v.password;
        });
        return users;
      })
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.usersRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<any> {
    delete user.email;
    delete user.password;

    return from(this.usersRepository.update(id, user));
  }

  login(user: User): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) => {
        return this.authService.generateJWT(user).pipe(map((jwt: string) => jwt));
      })
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return this.findByMail(email).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService.comparePasswords(password, user.password).pipe(
            map((match: boolean) => {
              if (match) {
                const { password, ...result } = user;
                return result;
              } else {
                throw new HttpException('Login was not successful', HttpStatus.UNAUTHORIZED);
              }
            })
          );
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      })
    );
  }

  findByMail(email: string): Observable<User> {
    return from(this.usersRepository.findOne({ email }));
  }
}
