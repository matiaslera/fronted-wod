import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { RegClientComponent } from './reg-client/reg-client.component';
import { RegProfComponent } from './reg-prof/reg-prof.component';


const routes: Routes = [
  { path: 'ingresar', component: LoginComponent, pathMatch: "full",
  //children: [
  // { path: '', component: LoginComponent, pathMatch: "full" },
  //] 
},
  { path: "404", component: NotfoundComponent, pathMatch: "full" },
  { path: "registrar", component: RegisterComponent, pathMatch: "full" },
  { path: "perfil", component: ProfileComponent, pathMatch: "full" },
  /* { path: '**', redirectTo: '404', pathMatch: 'full' }, */
  { path: "registrarCliente", component: RegClientComponent, pathMatch: "full" },
  { path: "registrarProfesional", component: RegProfComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
