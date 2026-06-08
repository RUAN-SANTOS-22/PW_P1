import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-esqueci-senha',
  imports: [CommonModule, FormsModule],
  templateUrl: './esqueci-senha.html',
  styleUrl: './esqueci-senha.css'
})
export class EsqueciSenha {
  email: string = "";
  mensagem: string = "";

  constructor(private service: ClienteService) {}

  verificarEmail() {
    this.service.esqueceuSenha(this.email).subscribe({
      next: () => {
        this.mensagem = "Se o email existir, você receberá sua senha em breve!";
        this.email = "";
      },
      error: () => {
        this.mensagem = "Erro ao processar. Tente mais tarde.";
      }
    });
  }
}