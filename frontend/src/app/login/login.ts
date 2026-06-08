import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class Login {
    mensagem: string = "";
    obj: Cliente = new Cliente();

    constructor(private service: ClienteService, private router: Router) { }

    entrar() {
    this.mensagem = "";
      this.service.fazerLogin(this.obj).subscribe(
        (dados) => {
            this.obj = dados;
            if(this.obj.codigo==0) {
              this.mensagem = "usuario ou senha invalidos";
            } else {
              localStorage.setItem("clienteLogado", JSON.stringify(this.obj));
              location.href="./vitrine";
            }
        },
        (erro) => {
            this.mensagem = "Ocorreu um erro, tente mais tarde!";
        });
    }
}