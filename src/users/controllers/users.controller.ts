import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { catchError, map, Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../models/user.interface';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: User): Observable<User | Object> {
    return this.usersService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message }))
    );
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() user: User): Observable<Object> {
    return this.usersService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      })
    );
  }

  @Get(':id')
  findOne(@Param() params): Observable<User> {
    return this.usersService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() request): Observable<User[]> {
    console.log(request.user);
    return this.usersService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<User> {
    return this.usersService.deleteOne(Number(id));
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.usersService.updateOne(Number(id), user);
  }
}
