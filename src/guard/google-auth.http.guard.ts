import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  // You can add any additional logic specific to Google authentication here
   constructor() {
    super({ session: false });
  }
}
  