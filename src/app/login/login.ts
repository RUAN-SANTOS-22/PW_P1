// login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    public mensagem: String = "";
    public email: string = "";
    public senha: string = "";
  
    public entrar(){
        let clienteJson = localStorage.getItem("cliente");
        
        if(clienteJson) {
            let cliente = JSON.parse(clienteJson);
            
            if(this.email === cliente.email && this.senha === cliente.senha) {
                this.mensagem = "Seja bem vindo ao site!";
                localStorage.setItem("usuarioLogado", "true");
            } else {
                this.mensagem = "Email ou senha incorretos!";
            }
        } else {
            this.mensagem = "Nenhum usuário cadastrado!";
        }
    }
}

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './login.html',
//   styleUrl: './login.css'
// })
// export class Login {
//     public mensagem: String = "";

//     public entrar(){
//         this.mensagem = "Seja bem vindo ao site!";
//     }
// }