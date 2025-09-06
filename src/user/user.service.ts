import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    createUser(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    findUserByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { email } });
    }

}
