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
    email: string = "";
    senha: string = "";

    constructor(private service: ClienteService, private router: Router) { }

    entrar() {
        if (!this.email || !this.senha) {
            this.mensagem = "Preencha email e senha!";
            return;
        }

        const credencial = new Cliente();
        credencial.email = this.email;
        credencial.senha = this.senha;

        this.service.fazerLogin(credencial).subscribe({
            next: (cliente) => {
                if (cliente && cliente.codigo > 0) {
                    localStorage.setItem("clienteLogado", JSON.stringify(cliente));
                    this.router.navigate(['/vitrine']);
                } else {
                    this.mensagem = "Email ou senha inválidos!";
                }
            },
            error: () => {
                this.mensagem = "Erro na comunicação com o servidor.";
            }
        });
    }
}