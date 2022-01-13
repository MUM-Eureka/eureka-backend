import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class UserEntity {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public firstName: string;
    
    @Column()
    public lastName: string;
    
    @Column({ unique: true })
    public email: string;

    @BeforeInsert()
    public emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }
    
    @Column()
    public password: string;
}
export default UserEntity;