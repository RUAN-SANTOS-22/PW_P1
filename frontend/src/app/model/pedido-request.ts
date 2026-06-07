export class PedidoRequest {
    clienteId: number = 0;
    itens: ItemPedidoDTO[] = [];
    total: number = 0;
}

export class ItemPedidoDTO {
    produtoId: number = 0;
    quantidade: number = 0;
    preco: number = 0;   // preço unitário pago (com desconto)
}