import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContatoModel } from '../model/contato';

@Component({
  selector: 'app-contato',
  imports: [FormsModule, CommonModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  public alerta: string = "";
  public obj: ContatoModel = new ContatoModel();

  public enviar() {
    let json = JSON.stringify(this.obj);
    localStorage.setItem("meuContato", json);
    this.alerta = "Sua mensagem foi enviada com sucesso!";
    
    // Limpar formulário após envio
    this.obj = new ContatoModel();
  }
}
