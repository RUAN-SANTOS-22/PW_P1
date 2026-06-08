import { Component, ChangeDetectorRef } from '@angular/core';
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
  mensagemToast: string = "";
  carregando: boolean = false;
 
  constructor(private service: ClienteService, private cdr: ChangeDetectorRef) {}
 
  private mostrarToast(id: string, mensagem?: string) {
    if (mensagem) this.mensagemToast = mensagem;
    this.cdr.detectChanges();
    const el = document.getElementById(id);
    if (el) {
      const toast = new (window as any).bootstrap.Toast(el, { delay: 4000 });
      toast.show();
    }
  }
 
  verificarEmail() {
    // Validações
    if (!this.email || this.email.trim() === "") {
      this.mostrarToast('toastSenhaErro', 'Informe o e-mail!');
      return;
    }
    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.mostrarToast('toastSenhaErro', 'Informe um e-mail válido!');
      return;
    }
 
    this.carregando = true;
 
    this.service.esqueceuSenha(this.email).subscribe({
      next: () => {
        this.carregando = false;
        this.email = "";
        this.mostrarToast('toastSenhaSucesso');
      },
      error: () => {
        this.carregando = false;
        this.mostrarToast('toastSenhaErro', 'Erro ao processar. Tente mais tarde.');
      }
    });
  }
}