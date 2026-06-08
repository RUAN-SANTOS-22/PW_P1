// app.ts
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- importe para *ngIf

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule], // <-- adicione CommonModule
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('web02');
  termoBusca: string = "";
  nomeUsuario: string = "";
  logado: boolean = false;

  ngOnInit() {
    // Verifica se existe cliente logado no localStorage
    const clienteJson = localStorage.getItem("clienteLogado");
    if (clienteJson) {
      const cliente = JSON.parse(clienteJson);
      this.nomeUsuario = cliente.nome;
      this.logado = true;
    }
  }

  buscar(event: Event) {
    event.preventDefault();
    if (this.termoBusca.trim() != "") {
      localStorage.setItem("termoBusca", this.termoBusca);
      location.href = "busca";
    }
  }

  logout() {
    localStorage.removeItem("clienteLogado");
    // Opcional: limpar também a cesta se desejar
    location.href = "/vitrine"; // recarrega e volta para a vitrine
  }
}