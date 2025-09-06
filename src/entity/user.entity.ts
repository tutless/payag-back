import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn({type:'int'})
    id: string;

    @Column({nullable:true})
    providerId: string;

    @Column()
    email: string;

    @Column({nullable:true})
    password: string;

    @Column()
    firstName: string;

    @Column({nullable:true})
    lastName: string;

    @Column({nullable:true})
    picture: string;

    
}