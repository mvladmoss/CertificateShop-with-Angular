import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient} from "@angular/common/http";
import { SignupComponent } from './signup/signup.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CertificatesComponent } from './certificates/certificates.component';
import { UpdateCertificateComponent } from './update-certificate/update-certificate.component';
//import { TagsInputModule } from 'ngx-tags-input/dist';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    WelcomePageComponent,
    LoginComponent,
    SignupComponent,
    CertificatesComponent,
    UpdateCertificateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomePageComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signUp', component: SignupComponent },
      { path: 'certificates', component: CertificatesComponent },{
        path: 'certificates/buy',component: UpdateCertificateComponent
      }
    ]),
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot()
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


