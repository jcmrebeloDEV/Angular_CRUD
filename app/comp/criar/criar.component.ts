import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidadorFormService } from '../../../app/shared/validacao/validador-form.service';
import { Usuario, UsuarioSerializado } from '../../../app/entidade/usuario';
import { RepositorioUsuarioService } from '../../../app/repositorio/repositorio-usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.css']
})

export class CriarComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  conectando: boolean = false;

  constructor(private validador: ValidadorFormService, private fb: FormBuilder,
    private repositorioUsuario: RepositorioUsuarioService, private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      cpf: ['', Validators.compose([Validators.required, this.validador.verificaSeCpfValido()]), /*validador assincrono*/this.validador.verificaSeCpfCadastrado.bind(this.validador)],
      userName: ['', [Validators.required],  /*validador assincrono*/this.validador.verificaSeUserNameCadastrado.bind(this.validador)],
      nome: ['', Validators.required],
      nascimento: ['', Validators.compose([Validators.required, Validators.pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.required],
      aceitaTermos: [false, /*Validators.requiredTrue*/]
    }, {
      validator: this.validador.mustMatch('password', 'confirmPassword'),
    });

  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid || this.registerForm.pending) {
      return;
    }


    let usr = new Usuario(this.registerForm.get('cpf').value,
      this.registerForm.get('nome').value,
      this.registerForm.get('userName').value,
      this.validador.transformaData(this.registerForm.get('nascimento').value),
      this.registerForm.get('aceitaTermos').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value
    );

    this.conectando = true;
    this.repositorioUsuario.criar(usr).
    subscribe(
      (usuSrlz: UsuarioSerializado) => {
        this.conectando = false;
        if (usuSrlz) {
          alert("usuario criado com sucesso!");
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
