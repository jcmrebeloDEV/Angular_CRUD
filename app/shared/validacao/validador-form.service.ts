/*
Serviço para validação customizada de campos de formulário
*/
import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, Validators, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { UsuarioSerializado } from 'src/app/entidade/usuario';
import { RepositorioUsuarioService } from './../../repositorio/repositorio-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ValidadorFormService {


  constructor(private repositorioUsuario: RepositorioUsuarioService) {

  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }



  verificaSeCpfCadastrado(control: AbstractControl): Observable<ValidationErrors | null> {
    /*
    Busca usuarios com o dado cpf usando o metodo 'repositorioUsuario.listarComParametros()' .
    Se a lista não retornar vazia é porque já existe um usuario com esse cpf
    */
    return this.repositorioUsuario.listarComParametros("?cpf=" + control.value)
      .pipe(
        debounceTime(1000),
        map(
          (u : UsuarioSerializado[]) => {
            if (u) {
              if (u.length > 0) return ({ 'cpfIndisponivel': true }); else return null;
            } else {
              return null;
            }

          })
      );

  }


  verificaSeUserNameCadastrado(control: AbstractControl): Observable<ValidationErrors | null> {
    /*
    Busca usuarios com o dado userName usando o metodo 'repositorioUsuario.listarComParametros()' .
    Se a lista não retornar vazia é porque já existe um usuario com esse userName
    */
    return this.repositorioUsuario.listarComParametros("?userName=" + control.value)
      .pipe(
        debounceTime(1000),
        map(
          (u : UsuarioSerializado[]) => {
            if (u) {
              if (u.length > 0) return ({ 'userNameIndisponivel': true }); else return null;
            } else {
              return null;
            }

          })

      );


  }

  verificaSeCpfValido(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      var cpf: String = control.value;

      if (!control.value) {
        return null;
      }

      if (this.validarCPF(cpf)) {
        return null
      } else {
        return { cpfInvalido: true };
      }

    };
  }


  validarCPF(cpf) {

    var add, i, rev;

    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
      return false;
    // Valida 1o digito	
    add = 0;
    for (i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
      return false;
    // Valida 2o digito	
    add = 0;
    for (i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
      return false;
    return true;
  }

  transformaData(str: string): Date {

    var parts = str.split("/");
    var dt = new Date(parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10));

    return dt;

  }

}

