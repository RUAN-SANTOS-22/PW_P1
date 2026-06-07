// esqueci-senha.ts
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
  novaSenha: string = "";
  confirmarSenha: string = "";
  mensagem: string = "";
  emailValidado: boolean = false;
  clienteOriginal: any = null;

  verificarEmail() {
    let clienteJson = localStorage.getItem("cliente");

    if (clienteJson) {
      let cliente = JSON.parse(clienteJson);

      if (this.email === cliente.email) {
        this.mensagem = "Email verificado! Digite sua nova senha.";
        this.emailValidado = true;
        this.clienteOriginal = cliente;
      } else {
        this.mensagem = "Email não encontrado!";
        this.emailValidado = false;
      }
    } else {
      this.mensagem = "Nenhum usuário cadastrado!";
      this.emailValidado = false;
    }
  }

  atualizarSenha() {
    if (this.novaSenha.includes(' ')) {
        this.mensagem = "A senha não pode conter espaços!";
        return;
    }

    if (this.novaSenha !== this.confirmarSenha) {
      this.mensagem = "As senhas não coincidem!";
      return;
    }

    if (this.novaSenha.length < 4) {
      this.mensagem = "A senha deve ter pelo menos 4 caracteres!";
      return;
    }

    this.clienteOriginal.senha = this.novaSenha;
    localStorage.setItem("cliente", JSON.stringify(this.clienteOriginal));

    this.mensagem = "Senha atualizada com sucesso! Você já pode fazer login.";
    
    // Limpar os campo
    setTimeout(() => {
      this.email = "";
      this.novaSenha = "";
      this.confirmarSenha = "";
      this.emailValidado = false;
      this.clienteOriginal = null;
    }, 3000);

     location.href = "login";

  }
}