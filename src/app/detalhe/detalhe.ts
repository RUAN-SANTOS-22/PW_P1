import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { ItemCesta } from '../model/item-cesta';

@Component({
  selector: 'app-detalhe',
  imports: [CommonModule],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css',
})
export class Detalhe {
    obj: Produto = new Produto();
    mensagem: string = "";

    ngOnInit(){
      this.carregar();
    }

    carregar(){
         let json = localStorage.getItem("ProdutoSelecionado");
      if(json != null){
        this.obj = JSON.parse(json);
      } else {
        this.mensagem = "Produto invalido, verifique!";
      }
    }
    
    adicionarItemCesta(obj:Produto){
        let json = localStorage.getItem("cesta");
        let lista : ItemCesta[] = [];
        let item : ItemCesta = new ItemCesta();

        if(json!=null){
           lista = JSON.parse(json);
        }
        
        let itemExistente = lista.find(item => item.produto.codigo === obj.codigo);
        
        let valorProduto = obj.promo < obj.valor ? obj.promo : obj.valor;

        if(itemExistente){
          // Se existe, aumenta a quantidade
          itemExistente.quantidade++;
          itemExistente.valor = itemExistente.quantidade * valorProduto;
        } else {
          // Se não existe, cria novo item
          let item : ItemCesta = new ItemCesta();
          item.produto = obj;
          item.quantidade = 1;
          item.valor =  valorProduto;
          lista.push(item);
        }
        
        localStorage.setItem("cesta", JSON.stringify(lista)); 
        location.href = "cesta";
      }
    
}
