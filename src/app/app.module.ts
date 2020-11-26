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
import { PopupPresupuestoComponent } from './compJob/popup-presupuesto/popup-presupuesto.component';
import { JobPresupuestoComponent } from './compJob/job-presupuesto/job-presupuesto.component';
import { PayJobComponent } from './compJob/pay-job/pay-job.component';
import { ChatRoomComponent } from './compChat/chat-room/chat-room.component';
import { ChatFormComponent } from './compChat/chat-form/chat-form.component';
import { FeedComponent } from './compChat/feed/feed.component';
import { UserListComponent } from './compChat/user-list/user-list.component';
import { ChatService } from './services/chat/chat.service';
import { UserItemComponent } from './compChat/user-item/user-item.component';
import { MessageComponent } from './compChat/message/message.component';
import { TurnSearchComponent } from './compTurn/turn-search/turn-search.component';
import { TurnPopupComponent } from './compTurn/turn-popup/turn-popup.component';
import { TurnDatosComponent } from './compTurn/turn-datos/turn-datos.component';

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
    PopupPresupuestoComponent,
    JobPresupuestoComponent,
    PayJobComponent,
    ChatRoomComponent,
    ChatFormComponent,
    FeedComponent,
    UserListComponent,
    UserItemComponent,
    MessageComponent,
    TurnSearchComponent,
    TurnPopupComponent,
    TurnDatosComponent
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
  providers: [CookieService,AuthUserService,ChatService],
  bootstrap: [AppComponent],
})
export class AppModule {}
