import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContatoModel } from '../model/contato';
import { ClienteService } from '../service/cliente.service';
 
@Component({
  selector: 'app-contato',
  imports: [FormsModule, CommonModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  public mensagemToast: string = "";
  public carregando: boolean = false;
  public obj: ContatoModel = new ContatoModel();
 
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
 
  enviar() {
    // Validações obrigatórias
    if (!this.obj.email || !String(this.obj.email).includes('@')) {
      this.mostrarToast('toastContatoErro', 'Informe um e-mail válido!');
      return;
    }
    if (!this.obj.assunto || String(this.obj.assunto).trim() === "") {
      this.mostrarToast('toastContatoErro', 'Selecione um assunto!');
      return;
    }
    if (!this.obj.mensagem || String(this.obj.mensagem).trim() === "") {
      this.mostrarToast('toastContatoErro', 'Escreva uma mensagem antes de enviar!');
      return;
    }
 
    this.carregando = true;
 
    this.service.enviarContato(this.obj).subscribe({
      next: () => {
        this.carregando = false;
        this.obj = new ContatoModel();
        this.mostrarToast('toastContatoSucesso');
      },
      error: () => {
        this.carregando = false;
        this.mostrarToast('toastContatoErro', 'Erro ao enviar mensagem. Tente mais tarde.');
      }
    });
  }
}