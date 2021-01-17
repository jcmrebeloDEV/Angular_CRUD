import { Component } from '@angular/core';
import {AutenticadorService} from './../app/shared/seguranca/autenticador.service';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //autenticador: AutenticadorService; 
  logado:boolean;
  constructor (private aut: AutenticadorService){
    //this.autenticador=this.aut;
  }

  ngDoCheck(){
    this.logado=this.aut.isLogado();
  }

}

