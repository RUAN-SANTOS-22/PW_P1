import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto.service';
import { Router } from '@angular/router';
import { ItemCesta } from '../model/item-cesta';

@Component({
    selector: 'app-busca',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './busca.html',
    styleUrls: ['./busca.css']
})
export class Busca implements OnInit {
    mensagem: string = "";
    lista: Produto[] = [];

    constructor(private service: ProdutoService, private router: Router) { }

    ngOnInit() {
        const termo = localStorage.getItem("termoBusca");
        if (termo && termo.trim() !== "") {
            this.service.fazerBusca(termo).subscribe({
                next: (dados) => {
                    this.lista = dados;
                    if (this.lista.length === 0) {
                        this.mensagem = `Nenhum produto encontrado para: ${termo}`;
                    }
                    localStorage.removeItem("termoBusca");
                },
                error: () => {
                    this.mensagem = "Erro na busca. Tente mais tarde.";
                }
            });
        } else {
            this.router.navigate(['/vitrine']);
        }
    }

    redirecionar(obj: Produto) {
        localStorage.setItem("ProdutoSelecionado", JSON.stringify(obj));
        this.router.navigate(['/detalhe']);
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
        this.router.navigate(['/cesta']);
    }
}