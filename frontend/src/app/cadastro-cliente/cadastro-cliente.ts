import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
    selector: 'app-cadastro-cliente',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './cadastro-cliente.html',
    styleUrls: ['./cadastro-cliente.css']
})
export class CadastroCliente {
    mensagem: string = "";
    obj: Cliente = new Cliente();

    constructor(private service: ClienteService) { }

    carregando: boolean = false;

gravar() {
    if (!this.obj.nome || !this.obj.email || !this.obj.senha) {
        this.mensagem = "Nome, email e senha são obrigatórios!";
        return;
    }

    this.carregando = true;
    this.service.gravar(this.obj).subscribe({
        next: () => {
            this.carregando = false;
            this.obj = new Cliente();
            const toastEl = document.getElementById('toastSucesso');
            const toast = new (window as any).bootstrap.Toast(toastEl);
            toast.show();
            setTimeout(() => location.href = "login", 3000);
        },
        error: (err) => {
            this.carregando = false;
            if (err.status === 500 && err.error?.message?.includes("Duplicate")) {
                this.mensagem = "Email já cadastrado. Tente outro!";
            } else {
                this.mensagem = "Erro ao cadastrar. Tente mais tarde.";
            }
        }
    });
}
}