import { Component, ChangeDetectorRef } from '@angular/core';
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
    mensagemToast: string = "";
    carregando: boolean = false;
    obj: Cliente = new Cliente();
 
    constructor(
        private service: ClienteService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }
 
    private mostrarToast(id: string, mensagem?: string) {
        if (mensagem) this.mensagemToast = mensagem;
        this.cdr.detectChanges();
        const el = document.getElementById(id);
        if (el) {
            const toast = new (window as any).bootstrap.Toast(el, { delay: 4000 });
            toast.show();
        }
    }
 
    entrar() {
        this.mensagem = "";
 
        // Validações de campos
        if (!this.obj.email || this.obj.email.trim() === "") {
            this.mostrarToast('toastLoginErro', 'Informe o e-mail!');
            return;
        }
        if (!this.obj.email.includes('@')) {
            this.mostrarToast('toastLoginErro', 'Informe um e-mail válido!');
            return;
        }
        if (!this.obj.senha || this.obj.senha.trim() === "") {
            this.mostrarToast('toastLoginErro', 'Informe a senha!');
            return;
        }
 
        this.carregando = true;
 
        this.service.fazerLogin(this.obj).subscribe({
            next: (dados) => {
                this.carregando = false;
                this.obj = dados;
                if (this.obj.codigo === 0) {
                    this.mostrarToast('toastLoginErro', 'Usuário ou senha inválidos!');
                } else {
                    localStorage.setItem("clienteLogado", JSON.stringify(this.obj));
                    this.mostrarToast('toastLoginSucesso');
                    setTimeout(() => location.href = "./vitrine", 1500);
                }
            },
            error: () => {
                this.carregando = false;
                this.mostrarToast('toastLoginErro', 'Ocorreu um erro. Tente mais tarde!');
            }
        });
    }
}