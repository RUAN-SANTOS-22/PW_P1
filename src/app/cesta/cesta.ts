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

  ngOnInit() {
    let json = localStorage.getItem("cesta");
    if (json == null) {
      this.mensagem = "Sua cesta esta vazia!!!";
    } else {
      this.lista = JSON.parse(json);
      this.calculaTotal();
    }
  }

  calculaTotal() {
    this.total = 0
    for (let obj of this.lista) {
      this.total = this.total + obj.valor;
    }
  }

  getValorProduto(produto: Produto): number {
    return produto.promo < produto.valor ? produto.promo : produto.valor;
  }

  aumentarQuantidade(item: ItemCesta) {
    item.quantidade++;
    let valorUnitario = this.getValorProduto(item.produto);
    item.valor = item.quantidade * valorUnitario;
    this.atualizarCesta();
  }

  diminuirQuantidade(item: ItemCesta) {
    if (item.quantidade > 1) {
      item.quantidade--;
      let valorUnitario = this.getValorProduto(item.produto);
      item.valor = item.quantidade * valorUnitario;
      this.atualizarCesta();
    } else {
      if (confirm("Deseja remover este item da cesta?")) {
        let index = this.lista.indexOf(item);
        this.lista.splice(index, 1);
        this.atualizarCesta();
      }
    }
  }

  removerItem(index: number) {
    if (confirm("Deseja remover este item da cesta?")) {
      this.lista.splice(index, 1);
      this.atualizarCesta();
    }
  }

  limparCesta() {
    if (confirm("Tem certeza que deseja cancelar toda a compra?")) {
      localStorage.removeItem("cesta");
      this.lista = [];
      this.total = 0;
      this.mensagem = "Compra cancelada!";
    }
  }

  atualizarCesta() {
    localStorage.setItem("cesta", JSON.stringify(this.lista));
    this.calculaTotal();
    if (this.lista.length == 0) {
      this.mensagem = "Sua cesta esta vazia!!!";
      localStorage.removeItem("cesta");
    }
  }


  finalizarPedido() {
    let pedido = {
      itens: this.lista,
      total: this.total,
      data: new Date().toISOString()
    };
    localStorage.setItem("ultimoPedido", JSON.stringify(pedido));

    localStorage.removeItem("cesta");

    this.mensagem = "Pedido finalizado com sucesso!";
    this.lista = [];
    this.total = 0;

  }
}