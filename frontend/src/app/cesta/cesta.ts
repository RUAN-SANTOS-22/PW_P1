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
    mensagemToast: string = "";
    lista: ItemCesta[] = [];
    total: number = 0;
    carregando: boolean = false;
 
    constructor(private pedidoService: PedidoService, private router: Router, private cdr: ChangeDetectorRef) { }
 
    ngOnInit() {
        const json = localStorage.getItem("cesta");
        if (json) {
            this.lista = JSON.parse(json);
            this.calculaTotal();
        }
    }
 
    calculaTotal() {
        this.total = this.lista.reduce((acc, item) => acc + item.valor, 0);
    }
 
    getValorProduto(produto: Produto): number {
        return produto.promo < produto.valor ? produto.promo : produto.valor;
    }
 
    private mostrarToast(id: string, mensagem?: string) {
        if (mensagem) this.mensagemToast = mensagem;
        this.cdr.detectChanges();
        const el = document.getElementById(id);
        if (el) {
            const toast = new (window as any).bootstrap.Toast(el, { delay: 4000 });
            toast.show();
        }
    }
 
    aumentarQuantidade(item: ItemCesta) {
        // Valida estoque antes de aumentar
        if (item.quantidade >= item.produto.quantidade) {
            this.mostrarToast('toastCestaAviso', `Estoque insuficiente! Apenas ${item.produto.quantidade} unidade(s) disponível(is).`);
            return;
        }
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
        }
    }
 
    finalizarPedido() {
        // Validação: cesta não pode estar vazia
        if (this.lista.length === 0) {
            this.mostrarToast('toastCestaAviso', 'Sua cesta está vazia!');
            return;
        }
 
        // Validação: usuário logado
        const clienteJson = localStorage.getItem("clienteLogado");
        if (!clienteJson) {
            this.mostrarToast('toastCestaErro', 'Você precisa estar logado para finalizar o pedido!');
            setTimeout(() => this.router.navigate(['/login']), 2000);
            return;
        }
 
        // Validação: verificar estoque de cada item
        for (const item of this.lista) {
            if (item.quantidade > item.produto.quantidade) {
                this.mostrarToast('toastCestaAviso',
                    `Estoque insuficiente para "${item.produto.nome}". Disponível: ${item.produto.quantidade}.`);
                return;
            }
        }
 
        const cliente = JSON.parse(clienteJson);
        this.carregando = true;
        this.mensagem = "";
 
        this.pedidoService.finalizarPedido(cliente.codigo, this.lista, this.total).subscribe({
            next: () => {
                this.carregando = false;
                localStorage.removeItem("cesta");
                this.lista = [];
                this.total = 0;
                this.cdr.detectChanges();
                this.mostrarToast('toastCestaSucesso');
                setTimeout(() => this.router.navigate(['/vitrine']), 2500);
            },
            error: () => {
                this.carregando = false;
                this.mostrarToast('toastCestaErro', 'Erro ao finalizar pedido. Tente novamente.');
            }
        });
    }
}