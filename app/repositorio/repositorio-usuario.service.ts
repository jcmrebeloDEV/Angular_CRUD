import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario, UsuarioSerializado } from '../../app/entidade/usuario';
import { Observable} from 'rxjs';
import {Configuracoes} from './../shared/Configuracoes';

@Injectable({
  providedIn: 'root'
})
export class RepositorioUsuarioService {

private usuarioApi =  Configuracoes.urls.usuarioApi;
private httpOptions = Configuracoes.urls.httpOptionsHeaderJson;

  constructor(private httpClient: HttpClient) {

  }

  onint() {

  }
 
  criar(usr: Usuario): Observable<UsuarioSerializado> {
    return this.httpClient.post<UsuarioSerializado>(
      this.usuarioApi, JSON.stringify(usr), this.httpOptions);
  }  


  excluir(usrs: Usuario[]): Observable<Object> {
     return this.httpClient.delete<Object>(
       this.usuarioApi + (usrs.map(x=>x.getCpf())).join() , this.httpOptions);
  }  

  buscar(cpf: string):Observable<UsuarioSerializado> {
    return this.httpClient.get<UsuarioSerializado>(this.usuarioApi + cpf);
  }


   listarComParametros(params: string): Observable<UsuarioSerializado[]> {
    return this.httpClient.get<UsuarioSerializado[]>(this.usuarioApi + params);
  }

  listar(): Observable<UsuarioSerializado[]> {
    return this.httpClient.get<UsuarioSerializado[]>(this.usuarioApi);
  }

  atualizar(usr: Usuario): Observable<UsuarioSerializado> {
    return this.httpClient.put<UsuarioSerializado>(
      this.usuarioApi + usr.getCpf(), JSON.stringify(usr),this.httpOptions);
  }  


}
