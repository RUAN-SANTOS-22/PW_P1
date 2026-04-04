import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';

@Component({
  selector: 'app-cadastro-cliente',
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css',
})
export class CadastroCliente {
  mensagem: String = "";
  obj: Cliente = new Cliente();

    gravar(){
    // Verificar se email já existe
    let clienteExistente = localStorage.getItem("cliente");
    if(clienteExistente) {
      let cliente = JSON.parse(clienteExistente);
      if(cliente.email === this.obj.email) {
        this.mensagem = "Email já cadastrado!";
        return;
      }
    }
    
    this.mensagem = "O seu cadastro foi gravado com sucesso!";
    let json = JSON.stringify(this.obj);
    localStorage.setItem("cliente", json);
  }
}

