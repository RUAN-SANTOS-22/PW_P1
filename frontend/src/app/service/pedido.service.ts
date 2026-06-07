import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemCesta } from '../model/item-cesta';
import { PedidoRequest } from '../model/pedido-request';

@Injectable({ providedIn: 'root' })
export class PedidoService {
    private apiUrl = 'http://localhost:8081/api/pedido';

    constructor(private http: HttpClient) { }

    finalizarPedido(clienteId: number, itensCesta: ItemCesta[], total: number): Observable<any> {
        const payload: PedidoRequest = {
            clienteId: clienteId,
            total: total,
            itens: itensCesta.map(item => ({
                produtoId: item.produto.codigo,
                quantidade: item.quantidade,
                preco: item.valor
            }))
        };
        return this.http.post(this.apiUrl, payload);
    }
}