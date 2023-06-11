import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarComponent } from './registrar/registrar.component';
import { LoginComponent } from './login/login.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { HomeComponent } from './home/home.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrar',
    component: RegistrarComponent
  },
  {
    path: 'recuperar-contrasena',
    component: RecuperarPasswordComponent
  },
  {
    path: 'verificar-email',
    component: VerificarEmailComponent
  },
  {
    path: 'home',
    component: HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['/register']))
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
