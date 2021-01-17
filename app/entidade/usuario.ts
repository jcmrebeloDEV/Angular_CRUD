
export interface UsuarioSerializado {

    cpf: string;
    nome: string;
    userName: string;
    nascimento: Date;
    aceitaTermos: boolean;
    email: string;
    senha: string;

}

export class Usuario {

    private cpf: string;
    private nome: string;
    private userName: string;
    private nascimento: Date;
    private aceitaTermos: boolean;
    private email: string;
    private senha: string;




    constructor(cpf: string, nome: string, userName: string, nascimento: Date, aceitaTermos: boolean, email: string, senha: string) {
        this.cpf = cpf;
        this.nome = nome;
        this.userName = userName;
        this.nascimento = nascimento;
        this.aceitaTermos = aceitaTermos;
        this.email = email;
        this.senha = senha;
    }



    public getCpf(): string {
        return this.cpf;
    }
    public setCpf(value: string) {
        this.cpf = value;
    }
    public getNome(): string {
        return this.nome;
    }
    public setNome(value: string) {
        this.nome = value;
    }
    public getUserName(): string {
        return this.userName;
    }
    public setUserName(value: string) {
        this.userName = value;
    }
    public getNascimento(): Date {
        return this.nascimento;
    }
    public setNascimento(value: Date) {
        this.nascimento = value;
    }


    public getAceitaTermos(): boolean {
        return this.aceitaTermos;
    }
    public setAeitaTermos(value: boolean) {
        this.aceitaTermos = value;
    }



    public getEmail(): string {
        return this.email;
    }
    public setEmail(value: string) {
        this.email = value;
    }


    public getSsenha(): string {
        return this.senha;
    }
    public setSenha(value: string) {
        this.senha = value;
    }


    public serializa(): string {
        return JSON.stringify(this);
    }

    public static deSerializa(usr: UsuarioSerializado): Usuario {
     
        /*como o JSON serializa apenas atributos, esta funcao pega os atributos
        serializados do objeto usuario e retona um objeto Usuario completo com os
        atributos e metodos
        */
        return new Usuario( usr.cpf,  usr.nome,  usr.userName,  usr.nascimento,
            usr.aceitaTermos,  usr.email,  usr.senha);
       
    }

    public static deSerializaLista(lista: UsuarioSerializado[]): Usuario[] {
     
        let listaFinal: Usuario[]=[];

        for (const usr of lista) {
            listaFinal.push(Usuario.deSerializa(usr));
          }
       
          return listaFinal;
    }

}