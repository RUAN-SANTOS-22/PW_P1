import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';
import { ItemCesta } from '../model/item-cesta';

@Component({
    selector: 'app-vitrine',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './vitrine.html',
    styleUrls: ['./vitrine.css']
})
export class Vitrine implements OnInit {
    mensagem: string = "";
    lista: Produto[] = [];

    constructor(
        private service: ProdutoService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.carregarVitrine();
    }

    carregarVitrine() {
        this.service.carregarVitrine().subscribe({
            next: (dados) => {
                this.lista = [...dados]; // <- spread força nova referência
                this.cdr.detectChanges(); // <- força Angular a re-renderizar
                console.log("Produtos recebidos:", this.lista.length);
            },
            error: (err) => {
                console.error("Erro:", err);
                this.mensagem = "Erro ao carregar produtos.";
            }
        });
    }

    redirecionar(obj: Produto) {
        localStorage.setItem("ProdutoSelecionado", JSON.stringify(obj));
        location.href = "./detalhe";
    }

    adicionarItemCesta(obj: Produto) {
        let json = localStorage.getItem("cesta");
        let lista: ItemCesta[] = json ? JSON.parse(json) : [];
        let valorUnitario = obj.promo < obj.valor ? obj.promo : obj.valor;
        let existente = lista.find(item => item.produto.codigo === obj.codigo);
        if (existente) {
            existente.quantidade++;
            existente.valor = existente.quantidade * valorUnitario;
        } else {
            lista.push({ produto: obj, quantidade: 1, valor: valorUnitario });
        }
        localStorage.setItem("cesta", JSON.stringify(lista));
        location.href = "./cesta";
    }
}