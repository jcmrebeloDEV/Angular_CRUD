import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticadorService } from '../../../app/shared/seguranca/autenticador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  conectando: boolean = false;
  loginInvalido: boolean;

  constructor(private fb: FormBuilder, private router: Router, private autenticador: AutenticadorService) { }

  ngOnInit(): void {

    //se estiver logado, desloga (faz a função de logout)
    if (this.autenticador.isLogado()) {
      this.autenticador.logout();
      this.router.navigateByUrl("/");
    }

    //se nao estiver logado, mostra o form de login
    this.loginForm = this.fb.group({
      email: ['' /*, Validators.compose([Validators.required, Validators.email])*/],
      password: ['' /*, Validators.compose([Validators.required, Validators.minLength(6)])*/],
    });


  }


  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loginInvalido = false;
    this.conectando = true;
    /*
        if (this.loginForm.invalid || this.loginForm.pending) {
          return;
        }
        */

    this.autenticador.login(this.f.email.value, this.f.password.value)
      .subscribe(
        data => {
          if (data) {
            this.conectando = false;
            this.router.navigateByUrl("/");
          }
        },
        error => {
          this.conectando = false;

          if (!(error.error instanceof ErrorEvent)) {

            if (error.status == 401) {
              this.loginInvalido = true;
            } else {
              alert("Ocorreu um erro. Tente novamente em alguns instantes");
            }
          }


        },
      );

  }


}
