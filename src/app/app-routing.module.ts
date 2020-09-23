import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { AuthUserService } from './services/auth/auth-user.service';

const routes: Routes = [
  { path: 'ingresar', component: LoginComponent, pathMatch: "full",
  //children: [
  // { path: '', component: LoginComponent, pathMatch: "full" },
  //] 
},
  { path: "404", component: NotfoundComponent, pathMatch: "full" },
  { path: "registar", component: RegisterComponent, pathMatch: "full" },
  { path: "perfil", component: ProfileComponent, pathMatch: "full" },
  { path: "home", component: AppComponent, pathMatch: "full" },
  
  /* { path: '**', redirectTo: '404', pathMatch: 'full' }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
