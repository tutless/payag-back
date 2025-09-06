import { Controller, Get, Req, Res, Response, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { GoogleAuthGuard } from 'src/guard/google-auth.http.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {
        // Redirect to Google for authentication
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthCallback(@Req() req, @Res({passthrough: false}) res) {

        //because google logged you in
        const userInfo = await this.authService.googleLogin(req.user, res);
        const { password, ...cleanUserInfo } = userInfo.user;
        const queryParams = {
            "message": "successfully logged in because google logs you in",
            ...cleanUserInfo,
            "token": userInfo.access_token

        }
    
        // a browser extension redirection
        res.redirect(`http://lcdkcfgilmllaaoikcnldghngnfjjkip.chromiumapp.org/provider_cb?${new URLSearchParams(queryParams).toString()}`);
        
        // res.redirect(`http://localhost:5173/auth?${new URLSearchParams(queryParams).toString()}`);
        // res.redirect(`http://lcdkcfgilmllaaoikcnldghngnfjjkip.chromiumapp.org/provider_cb?token=${userInfo.access_token}`);
        // `req.user` is set through validate()
        //return this.authService.login(req.user)
       
    }
}
