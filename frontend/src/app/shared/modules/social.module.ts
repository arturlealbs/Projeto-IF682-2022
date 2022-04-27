import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { 
  SocialAuthServiceConfig,
  FacebookLoginProvider, 
  SocialLoginModule, 
} from '@abacritt/angularx-social-login';

const fbLoginOptions = {
  scope: 'email,public_profile,user_age_range,user_birthday,user_gender', // ,user_photos
  return_scopes: true,
  enable_profile_selector: true
};

@NgModule({
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              environment.facebookID,
              fbLoginOptions
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
  ],
  declarations: [],
  imports: [
    SocialLoginModule,
  ],
  exports: [],
})
export class SocialModule { }
