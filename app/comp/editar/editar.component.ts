import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidadorFormService } from '../../../app/shared/validacao/validador-form.service';
import { Usuario, UsuarioSerializado } from '../../../app/entidade/usuario';
import { RepositorioUsuarioService } from '../../../app/repositorio/repositorio-usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  usr: Usuario = null;
  registerForm: FormGroup;
  submitted = false;
  conectando: boolean;


  constructor(private validador: ValidadorFormService, private fb: FormBuilder,
    private repositorioUsuario: RepositorioUsuarioService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.conectando = true;
    this.carregaUsuario();

  }


  get f() { return this.registerForm.controls; }

  criaFormulario() {

    this.registerForm = this.fb.group({
      cpf: [{ value: this.usr.getCpf(), disabled: true }],
      userName: [{ value: this.usr.getUserName(), disabled: true }],
      nome: [this.usr.getNome(), Validators.required],
      nascimento: [new Date(this.usr.getNascimento()).toLocaleDateString('pt-br'), Validators.compose([Validators.required, Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)])],
      email: [this.usr.getEmail(), Validators.compose([Validators.required, Validators.email])],
      password: [this.usr.getSsenha(), Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: [this.usr.getSsenha(), Validators.required],
      aceitaTermos: [this.usr.getAceitaTermos(), /*Validators.requiredTrue*/]
    }, {
      validator: this.validador.mustMatch('password', 'confirmPassword'),
    });

  }

  carregaUsuario() {

    this.repositorioUsuario.buscar(this.route.snapshot.params.cpf).
    subscribe(
      (usuSrlz: UsuarioSerializado) => {
        this.conectando = false;
        if (usuSrlz) {
          this.usr = Usuario.deSerializa(usuSrlz);
          this.criaFormulario();
        }
      },
      error => {
        this.conectando = false;
        alert("Ocorreu um erro, tente novamente em alguns instantes \n'" /*+ error*/);
      }

    );

  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid || this.registerForm.pending) {
      return;
    }


    this.usr.setCpf(this.registerForm.get('cpf').value);
    this.usr.setNome(this.registerForm.get('nome').value);
    this.usr.setUserName(this.registerForm.get('userName').value);
    this.usr.setNascimento(this.validador.transformaData(this.registerForm.get('nascimento').value));
    this.usr.setAeitaTermos(this.registerForm.get('aceitaTermos').value);
    this.usr.setEmail(this.registerForm.get('email').value);
    this.usr.setSenha(this.registerForm.get('password').value);

    this.conectando = true;

    this.repositorioUsuario.atualizar(this.usr)
    .subscribe(
      (usuSrlz: UsuarioSerializado) => {
        this.conectando = false;

        if (usuSrlz) {
          alert("usuario editado com sucesso!");
          this.retorna();
        }

      },
      error => {
        this.conectando = false;
        alert("Ocorreu um erro, tente novamente em alguns instantes \n'" /*+ error*/);
      }

    );

  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  retorna() {
    this.router.navigateByUrl("/");
  }

}
