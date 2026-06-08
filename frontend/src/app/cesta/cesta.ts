import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { ItemCesta } from '../model/item-cesta';
import { PedidoService } from '../service/pedido.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cesta',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cesta.html',
    styleUrls: ['./cesta.css']
})
export class Cesta implements OnInit {
    mensagem: string = "";
    lista: ItemCesta[] = [];
    total: number = 0;

    constructor(private pedidoService: PedidoService, private router: Router, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        const json = localStorage.getItem("cesta");
        if (json) {
            this.lista = JSON.parse(json);
            this.calculaTotal();
        } else {
            this.mensagem = "Sua cesta está vazia!";
        }
    }

    calculaTotal() {
        this.total = this.lista.reduce((acc, item) => acc + item.valor, 0);
    }

    getValorProduto(produto: Produto): number {
        return produto.promo < produto.valor ? produto.promo : produto.valor;
    }

    aumentarQuantidade(item: ItemCesta) {
        item.quantidade++;
        const valorUnitario = this.getValorProduto(item.produto);
        item.valor = item.quantidade * valorUnitario;
        this.atualizarCesta();
    }

    diminuirQuantidade(item: ItemCesta) {
        if (item.quantidade > 1) {
            item.quantidade--;
            const valorUnitario = this.getValorProduto(item.produto);
            item.valor = item.quantidade * valorUnitario;
            this.atualizarCesta();
        } else {
            if (confirm("Remover este item da cesta?")) {
                const index = this.lista.indexOf(item);
                this.lista.splice(index, 1);
                this.atualizarCesta();
            }
        }
    }

    removerItem(index: number) {
        if (confirm("Remover este item?")) {
            this.lista.splice(index, 1);
            this.atualizarCesta();
        }
    }

    limparCesta() {
        if (confirm("Cancelar toda a compra?")) {
            localStorage.removeItem("cesta");
            this.lista = [];
            this.total = 0;
            this.mensagem = "Compra cancelada!";
        }
    }

    atualizarCesta() {
        localStorage.setItem("cesta", JSON.stringify(this.lista));
        this.calculaTotal();
        if (this.lista.length === 0) {
            localStorage.removeItem("cesta");
            this.mensagem = "Sua cesta está vazia!";
        }
    }
    finalizarPedido() {
    const clienteJson = localStorage.getItem("clienteLogado");
    if (!clienteJson) {
        this.mensagem = "Você precisa estar logado para finalizar o pedido!";
        this.router.navigate(['/login']);
        return;
    }

    const cliente = JSON.parse(clienteJson);
    this.pedidoService.finalizarPedido(cliente.codigo, this.lista, this.total).subscribe({
       next: () => {
        localStorage.removeItem("cesta");
        this.lista = [];
        this.total = 0;
        this.mensagem = "Pedido finalizado com sucesso!";
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/vitrine']), 2000);
    },
        error: () => {
            this.mensagem = "Erro ao finalizar pedido. Tente novamente.";
        }
    });
}
}