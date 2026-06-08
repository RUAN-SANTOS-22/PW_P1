import { Component } from '@angular/core';
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
  public alerta: string = "";
  public obj: ContatoModel = new ContatoModel();

 constructor(private service: ClienteService) {}

  enviar() {
      this.service.enviarContato(this.obj).subscribe({
          next: () => {
              this.alerta = "Sua mensagem foi enviada com sucesso!";
              this.obj = new ContatoModel();
          },
          error: () => {
              this.alerta = "Erro ao enviar mensagem. Tente mais tarde.";
          }
      });
  }
}
