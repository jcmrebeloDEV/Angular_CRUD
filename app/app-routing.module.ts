import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriarComponent } from './comp/criar/criar.component';  
import { ListarComponent } from './comp/listar/listar.component';
import { EditarComponent } from './comp/editar/editar.component';
import {LoginComponent}  from './comp/login/login.component';
import { GuardaService } from './shared/seguranca/guarda.service';

const routes: Routes = [
  { path: 'Listar', component: ListarComponent, canActivate:[GuardaService] },
  { path: 'Criar', component: CriarComponent , canActivate:[GuardaService]},
  { path: 'Editar/:cpf', component: EditarComponent, canActivate:[GuardaService] },
  { path: 'Login', component: LoginComponent },
  { path: 'Logout', component: LoginComponent },
  { path: '',   redirectTo: '/Listar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
