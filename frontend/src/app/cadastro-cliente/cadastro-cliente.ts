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

    gravar() {
        this.service.gravar(this.obj).subscribe({
            next: () => {
                this.mensagem = "Cadastro realizado com sucesso!";
                this.obj = new Cliente();
            },
            error: () => {
                this.mensagem = "Erro ao cadastrar. Tente mais tarde.";
            }
        });
    }
}