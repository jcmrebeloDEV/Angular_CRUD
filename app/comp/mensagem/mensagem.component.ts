/*
Componente de exemplo de passagem de valores Pai -> filho
*/
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  @Input() public mostraMsgConectando:boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
