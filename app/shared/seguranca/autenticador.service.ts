import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Configuracoes } from '../../shared/Configuracoes';


@Injectable({
  providedIn: 'root'
})
export class AutenticadorService {

  private loginApi = Configuracoes.urls.loginApi;

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<any> {

    return this.httpClient.post<{ 'access_token': string }>(
      this.loginApi, { email, password })
      .pipe(
        tap(
          dados => {
            if (dados) {
              localStorage.setItem('access_token', dados.access_token);
            }
          }
        )
      );

  }


  logout() {
    localStorage.removeItem('access_token');
  }


  isLogado(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  static obterToken(): string {
    return localStorage.getItem('access_token');
  }

}
