import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-esqueci-senha',
  imports: [CommonModule, FormsModule],
  templateUrl: './esqueci-senha.html',
  styleUrl: './esqueci-senha.css'
})
export class EsqueciSenha {
  email: string = "";
  mensagem: string = "";

  recuperar() {
    let clienteJson = localStorage.getItem("cliente");

    if (clienteJson) {
      let cliente = JSON.parse(clienteJson);

      if (this.email === cliente.email) {
        this.mensagem = "Sua senha é: " + cliente.senha;
      } else {
        this.mensagem = "Email não encontrado!";
      }
    } else {
      this.mensagem = "Nenhum usuário cadastrado!";
    }
  }
}
