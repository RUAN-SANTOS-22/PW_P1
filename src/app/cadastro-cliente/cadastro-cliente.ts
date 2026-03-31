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
    this.mensagem = "O seu cadastro foi gravado com sucesso!";
    let json = JSON.stringify(this.obj);
    localStorage.setItem("cliente", json);
  }


}
