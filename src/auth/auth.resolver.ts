import { Context, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserModel } from 'models/user.model';

import { UserResponseModel } from 'models/user_response.model';
import { GqlAuthGuard } from 'src/guard/gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    // @Query(() => String)
    // @UseGuards(AuthGuard('google'))
    // async login() {
    //     return 'redirect to google';    
    // }

    //google callback
    // @Query(() => String)
    // async googleAuthRedirect(@Context() context) {
    //     const user = context.req.user;
    //     const token = this.authService.googleLogin(user);
    //     return (await token).access_token
    // }

    @Query(returns => UserResponseModel)
    @UseGuards(GqlAuthGuard)
    async profile(@Context() ctx) {
        const responseModel = new UserResponseModel();
        responseModel.response =  {...ctx.req.user};
        return responseModel;
    }

}


