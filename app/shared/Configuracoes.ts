import { HttpHeaders } from '@angular/common/http';
/*
As constantes aqui declaradas poderiam ser colocadas no arquivo

/src/environments/environments.ts e em

/src/environments/environments.prod.ts

(Este último arquivo substitui o primeiro depois da compilação
para produção usando 'ng build --prod` ).
*/
export class Configuracoes {

  private static urlBase: string = "http://localhost:3000";

  static urls = class {

    static usuarioApi: string = Configuracoes.urlBase + "/usuarios/";
    static loginApi: string = Configuracoes.urlBase + "/auth/login/";

    static httpOptionsHeaderJson = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  
  }

  static seguranca = class {

    static dominiosPermitidos: string[] = [Configuracoes.urlBase.substring(7)];
    static rotasDesabilitadas: string[] = [Configuracoes.urls.loginApi];

  }


}


