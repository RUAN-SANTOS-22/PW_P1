import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { ItemCesta } from '../model/item-cesta';

@Component({
  selector: 'app-cesta',
  imports: [CommonModule],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css',
})
export class Cesta {
  mensagem: String = "";
  lista: ItemCesta[] = [];
  total: number = 0;

  ngOnInit(){
    let json = localStorage.getItem("cesta");
    if(json==null){
      this.mensagem = "Sua cesta esta vazia!!!";
    } else {
      this.lista = JSON.parse(json);
      this.calculaTotal();
    }
  }

  calculaTotal(){
    this.total = 0
    for(let obj of this.lista){
      this.total = this.total + obj.valor;
    }
  }
  finalizarPedido() {
    // Salvar pedido no localStorage
    let pedido = {
        itens: this.lista,
        total: this.total,
        data: new Date().toISOString()
    };
    localStorage.setItem("ultimoPedido", JSON.stringify(pedido));
    
    // Limpar cesta
    localStorage.removeItem("cesta");
    
    this.mensagem = "Pedido finalizado com sucesso!";
    this.lista = [];
    this.total = 0;
    //location.href = "confirmacao"; testar
    
}
}