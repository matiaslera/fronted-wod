import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { HttpClientModule } from '@angular/common/http';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthUserService } from './services/auth/auth-user.service';
import { ResetPassComponent } from './compLogin/reset-pass/reset-pass.component';
import { LoginComponent } from './compLogin/login/login.component';
import { RegisterComponent } from './compLogin/register/register.component';
import { WelcomeComponent } from './compLogin/welcome/welcome.component';
import { ProfileUpdateComponent } from './compProfile/profile-update/profile-update.component';
import { ProfileComponent } from './compProfile/profile/profile.component';
import { NewPresupuestoComponent } from './compJob/new-presupuesto/new-presupuesto.component';
import { ListTrabajosComponent } from './compJob/list-trabajos/list-trabajos.component';
import { JobComponent } from './compJob/job/job.component';
import { JobDetallesComponent } from './compJob/job-detalles/job-detalles.component';
import { JobRespuestaComponent } from './compJob/job-respuesta/job-respuesta.component';
import { JobContatarComponent } from './compJob/job-contatar/job-contatar.component';
import { JobFinalizadoComponent } from './compJob/job-finalizado/job-finalizado.component';
import { JobPendienteComponent } from './compJob/job-pendiente/job-pendiente.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavegacionComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    ResetPassComponent,
    WelcomeComponent,
    NewPresupuestoComponent,
    ListTrabajosComponent,
    JobComponent,
    JobDetallesComponent,
    JobRespuestaComponent,
    JobContatarComponent,
    JobFinalizadoComponent,
    JobPendienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [CookieService,AuthUserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
