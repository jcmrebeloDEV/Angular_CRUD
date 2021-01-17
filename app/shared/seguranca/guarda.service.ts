import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {AutenticadorService} from '../../../app/shared/seguranca/autenticador.service';


@Injectable({
  providedIn: 'root'
})
export class GuardaService implements CanActivate  {

  constructor(private autenticador: AutenticadorService, private router: Router){ }

  canActivate(): boolean | UrlTree {

    if (this.autenticador.isLogado()){
      return true
    }  else return this.router.parseUrl("/Login");

  }
}
