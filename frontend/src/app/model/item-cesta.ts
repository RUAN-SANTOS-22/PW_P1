// frontend/src/app/model/item-cesta.ts
import { Produto } from "./produto";

export class ItemCesta {
    produto: Produto = new Produto();
    quantidade: number = 1;
    valor: number = 0;   // preço unitário (já com desconto)
}