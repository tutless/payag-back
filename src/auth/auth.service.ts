import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService:JwtService, 
        private readonly userService: UserService) {}

    async googleLogin(user: any, res:any){
        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);
        const newUser = new UserEntity();
        newUser.email = user.email;
        newUser.providerId = user.id;
        newUser.firstName = user.firstName;``
        newUser.lastName = user.lastName;
        newUser.picture = user.picture;

       
  
        const isExist = await this.userService.findUserByEmail(user.email);
        
        try{   
            if(isExist){
                return{
                    access_token: token,
                    user:isExist
                }
            } else{
                throw new Error('User does not exist');
            }

        }catch(error){
            console.error('Error creating user:', error);
            const createdUser = await this.userService.createUser(newUser);

            return {
                access_token: token,
                user:createdUser
            };
        } finally{

            // this will write when app is normal it will skip when it isnt (browser extension app)
            res.cookie('jwt', token, { 
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 // 1 day
            });
        }

       
           
    }


    
}