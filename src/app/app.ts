import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web02');
  termoBusca: string = "";

  buscar(event: Event) {
    event.preventDefault();
    if(this.termoBusca.trim() != ""){
      localStorage.setItem("termoBusca", this.termoBusca);
      location.href = "busca";
    }
  }
}