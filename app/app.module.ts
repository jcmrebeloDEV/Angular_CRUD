import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarComponent } from './comp/criar/criar.component';  
import { ReactiveFormsModule } from '@angular/forms';
import { ListarComponent } from './comp/listar/listar.component';
import { EditarComponent } from './comp/editar/editar.component';
import { LoginComponent } from './comp/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import {Configuracoes} from './shared/Configuracoes';
import { AutenticadorService } from './shared/seguranca/autenticador.service';
import { MensagemComponent } from './comp/mensagem/mensagem.component';


@NgModule({
  declarations: [
    AppComponent,
    CriarComponent,
    ListarComponent,
    EditarComponent,
    LoginComponent,
    MensagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return AutenticadorService.obterToken();           
            },
             allowedDomains: Configuracoes.seguranca.dominiosPermitidos ,
             disallowedRoutes: Configuracoes.seguranca.rotasDesabilitadas 
      }
    })

      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
