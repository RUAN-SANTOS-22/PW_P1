import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';
import { ItemCesta } from '../model/item-cesta';
@Component({
  selector: 'app-vitrine',
  imports: [CommonModule],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine {
    mensagem: string = "";
    lista : Produto[] = [
  {
    "codigo": 1,
    "nome": "Abacate",
    "descritivo": "Abacate fresco e cremoso, rico em gorduras boas e vitaminas.",
    "valor": 8.90,
    "promo": 6.90,
    "quantidade": 30,
    "keywords": "abacate, fruta, saudavel, cremoso"
  },
  {
    "codigo": 2,
    "nome": "Abacaxi",
    "descritivo": "Abacaxi doce e suculento, fonte de vitamina C e antioxidantes.",
    "valor": 7.50,
    "promo": 5.90,
    "quantidade": 25,
    "keywords": "abacaxi, fruta, doce, suculento"
  },
  {
    "codigo": 3,
    "nome": "Alface",
    "descritivo": "Alface crocante e fresca, ideal para saladas e sanduíches.",
    "valor": 4.50,
    "promo": 3.50,
    "quantidade": 50,
    "keywords": "alface, verdura, salada, fresco"
  },
  {
    "codigo": 4,
    "nome": "Banana",
    "descritivo": "Banana prata madura, rica em potássio e energia natural.",
    "valor": 6.90,
    "promo": 4.90,
    "quantidade": 45,
    "keywords": "banana, fruta, potassio, energia"
  },
  {
    "codigo": 5,
    "nome": "Batata",
    "descritivo": "Batata lisa e firme, perfeita para cozinhar, fritar ou assar.",
    "valor": 5.90,
    "promo": 4.50,
    "quantidade": 60,
    "keywords": "batata, legume, cozinha, fritar"
  },
  {
    "codigo": 6,
    "nome": "Brocolis",
    "descritivo": "Brócolis fresco, rico em vitaminas e fibras para uma alimentação saudável.",
    "valor": 7.90,
    "promo": 5.90,
    "quantidade": 35,
    "keywords": "brocolis, verdura, saudavel, vitaminas"
  },
  {
    "codigo": 7,
    "nome": "Cebola",
    "descritivo": "Cebola roxa firme e saborosa, essencial na culinária.",
    "valor": 5.90,
    "promo": 3.90,
    "quantidade": 55,
    "keywords": "cebola, legume, cozinha, tempero"
  },
  {
    "codigo": 8,
    "nome": "Cenoura",
    "descritivo": "Cenoura doce e crocante, fonte de betacaroteno para a visão.",
    "valor": 4.90,
    "promo": 3.90,
    "quantidade": 50,
    "keywords": "cenoura, legume, vitamina, saude"
  },
  {
    "codigo": 9,
    "nome": "Laranja",
    "descritivo": "Laranja pera suculenta, rica em vitamina C e antioxidantes.",
    "valor": 5.90,
    "promo": 4.50,
    "quantidade": 0,
    "keywords": "laranja, fruta, vitamina, suco"
  },
  {
    "codigo": 10,
    "nome": "Maca",
    "descritivo": "Maçã fuji crocante e doce, perfeita para lanches e receitas.",
    "valor": 9.90,
    "promo": 7.90,
    "quantidade": 40,
    "keywords": "maca, fruta, crocante, doce"
  },
  {
    "codigo": 11,
    "nome": "Melancia",
    "descritivo": "Melancia vermelha e doce, refrescante e hidratante.",
    "valor": 12.90,
    "promo": 9.90,
    "quantidade": 20,
    "keywords": "melancia, fruta, refrescante, doce"
  },
  {
    "codigo": 12,
    "nome": "Tomate",
    "descritivo": "Tomate maduro e saboroso, ideal para saladas e molhos.",
    "valor": 6.90,
    "promo": 4.90,
    "quantidade": 45,
    "keywords": "tomate, legume, salada, molho"
  },
  {
    "codigo": 13,
    "nome": "Uva",
    "descritivo": "Uva sem semente, doce e perfeita para consumo in natura ou sucos.",
    "valor": 14.90,
    "promo": 11.90,
    "quantidade": 25,
    "keywords": "uva, fruta, doce, suco"
  }
    ]; 
    redirecionar(obj:Produto){
      localStorage.setItem("ProdutoSelecionado", JSON.stringify(obj));
      location.href="detalhe";
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
          item.valor = valorProduto;
          lista.push(item);
        }
        
        localStorage.setItem("cesta", JSON.stringify(lista)); 
        location.href = "cesta";
    }
}
