import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AuthUserService } from './services/auth/auth-user.service';
import { ResetPassComponent } from './compLogin/reset-pass/reset-pass.component';
import { LoginComponent } from './compLogin/login/login.component';
import { RegisterComponent } from './compLogin/register/register.component';
import { WelcomeComponent } from './compLogin/welcome/welcome.component';
import { ProfileComponent } from './compProfile/profile/profile.component';
import { NewPresupuestoComponent } from './compJob/new-presupuesto/new-presupuesto.component';
import { ListTrabajosComponent } from './compJob/list-trabajos/list-trabajos.component';
import { JobPendienteComponent } from './compJob/job-pendiente/job-pendiente.component';
import { JobDetallesComponent } from './compJob/job-detalles/job-detalles.component';
import { JobRespuestaComponent } from './compJob/job-respuesta/job-respuesta.component';
import { JobPresupuestoComponent } from './compJob/job-presupuesto/job-presupuesto.component';
import { JobFinalizadoComponent } from './compJob/job-finalizado/job-finalizado.component';
import { ChatRoomComponent } from './compChat/chat-room/chat-room.component';
import { TurnSearchComponent } from './compTurn/turn-search/turn-search.component';
import { TurnDatosComponent } from './compTurn/turn-datos/turn-datos.component';
import { TurnMainComponent } from './compTurn/turn-main/turn-main.component';
import { TurnPagoComponent } from './compTurn/turn-pago/turn-pago.component';


const routes: Routes = [
  { path: 'ingresar', component: LoginComponent, pathMatch: "full",
  //children: [
  // { path: '', component: LoginComponent, pathMatch: "full" },
  //] 
},
  { path: "404", component: NotfoundComponent, pathMatch: "full" },
  { path: "registar", component: RegisterComponent, pathMatch: "full" },
  { path: "perfil", component: ProfileComponent, pathMatch: "full"},
  { path: "home", component: AppComponent, pathMatch: "full" },
  { path: "resetear", component: ResetPassComponent, pathMatch: "full" },
  { path: "bienvenido", component: WelcomeComponent, pathMatch: "full" },
  { path: "searchPresupuesto", component: NewPresupuestoComponent, pathMatch: "full" },
  { path: "misPresupuestos", component: JobPresupuestoComponent, pathMatch: "full" },
  { path: "jobPendientes", component: JobPendienteComponent, pathMatch: "full" },
  { path: "jobFinalizado", component: JobFinalizadoComponent, pathMatch: "full" },
  { path: 'jobDetalles/:id', component: JobDetallesComponent,pathMatch: "full" },
  { path: 'chat', component: ChatRoomComponent,pathMatch: "full" },
  { path: 'turnos', component: TurnMainComponent,pathMatch: "full" },
  { path: 'turnosDetalles/:id', component: TurnDatosComponent,pathMatch: "full" },
  { path: 'turnoPago/:id', component: TurnPagoComponent,pathMatch: "full" },
 // {path: 'jobRespuesta/:id', component: JobRespuestaComponent,pathMatch:"full"},
  { path: "listaTrabajos", component: ListTrabajosComponent, pathMatch: "full" },
  { path: '**', redirectTo: '404', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
