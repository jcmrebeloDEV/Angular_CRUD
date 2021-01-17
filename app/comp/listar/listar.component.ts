import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ValidadorFormService } from '../../../app/shared/validacao/validador-form.service';
import { Usuario, UsuarioSerializado } from '../../../app/entidade/usuario';
import { RepositorioUsuarioService } from '../../../app/repositorio/repositorio-usuario.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})

export class ListarComponent implements OnInit {

  grupo: FormGroup;
  selecionaTodos: boolean = false;
  listaDeUsuarios: Usuario[] = [];
  conectando: boolean = false;

  constructor(private validador: ValidadorFormService, private fb: FormBuilder, private repositorioUsuario: RepositorioUsuarioService) { }

  ngOnInit(): void {

    this.carregaLista();

    //cria o formgroup e o array listaDeSelecaoDeUsuarios para exibir a lista de usuarios
    this.grupo = new FormGroup({
      listaDeSelecaoDeUsuarios: new FormArray([]),
    });

  }


  carregaLista() {

    this.conectando = true;

    //obtem a lista de usuarios do repositorio via um Observable
    this.repositorioUsuario.listar().subscribe(
      (listaSerializada: UsuarioSerializado[]) => {
       
        if(listaSerializada){
          this.conectando = false;
          this.listaDeUsuarios = Usuario.deSerializaLista(listaSerializada);
          //limpa e cria os controles (checkbox, com valor default falso/desmarcado) da 
          //listaDeSelecaoDeUsuarios de acordo com o numero de usuarios em listaDeUsuarios
          this.listaDeSelecaoDeUsuarios.clear();
  
          for (const usr of this.listaDeUsuarios) {
            this.listaDeSelecaoDeUsuarios.push(new FormControl(false));
          }
        }    

      },
      error => {
        this.conectando = false;
        alert("Ocorreu um erro de conexão. Tente novamente em alguns instantes");
       }
    );


  }

  //metodo auxiliar
  get listaDeSelecaoDeUsuarios(): FormArray {
    return this.grupo.get('listaDeSelecaoDeUsuarios') as FormArray;
  }


  marcaDesmarcaTodos() {
    //variavel boolean para sinalizar se todos os checkbox em listaDeSelecaoDeUsuarios devem ser marcados/desmarcados
    this.selecionaTodos = !this.selecionaTodos;

    //marca ou desmarca todos os checkbox de acordo com o valor da variavel
    //(deve-se criar um array de valores para preencher a listaDeSelecaoDeUsuarios com eles)
    this.listaDeSelecaoDeUsuarios.setValue((new Array(this.listaDeSelecaoDeUsuarios.value.length)).
    fill(this.selecionaTodos));

  }

  excluir() {

    //verifica se pelo menos um elemento foi selecionado
    if (!this.listaDeSelecaoDeUsuarios.value.includes(true)) {
      alert("Selecione ao menos um elemento");
      return;
    }

    if (!window.confirm("Você realmente quer excluir o(s) iten(s)?")) return;

    //gera a lista de usuarios para excluir
    let lisatDeUsuariosParaExcluir: Usuario[] = [];
    for (var i = 0; i < this.listaDeSelecaoDeUsuarios.length; i++) {

      if (this.listaDeSelecaoDeUsuarios.value[i] == true) {
        lisatDeUsuariosParaExcluir.push(this.listaDeUsuarios[i]);
      }

    }

    this.conectando = true;
    this.repositorioUsuario.excluir(lisatDeUsuariosParaExcluir).
    subscribe(
      (obj: Object) => {
        if (obj) {
          this.conectando = false;
          alert("Usuario(s) excluidos com sucesso!");
          this.carregaLista();}        
        },
        error =>{
          this.conectando = false;
          alert("Ocorreu um erro de conexão. Tente novamente em alguns instantes");
        });

      }

        /*  *******Lógica para exclusao dos itens da interface do usuario sem recarregar a lisat do servidor****** 
         
        //faz a exclusao da lista de usuarios e da lista do formulario (interface do usuariod)
       for (var i = 0; i < this.listaDeSelecaoDeUsuarios.length; i++) {
   
         if (this.listaDeSelecaoDeUsuarios.value[i] == true) {
   
           //usuariosParaExcluir.push(this.listaDeUsuarios[i]);
           
           //sucesso
          this. listaDeSelecaoDeUsuarios.removeAt(i);
           this.listaDeUsuarios.splice(i, 1);
   
           //como os arrays sao redimensionados pela exclusao dos elemntos, precisamos
           //decrementar o indice para nao pular elementos
           i--;
         }   
   
       }  */

   


  transformaData(str: string): Date {

    var parts = str.split("/");
    var dt = new Date(parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10));

    return dt;
  }



}
