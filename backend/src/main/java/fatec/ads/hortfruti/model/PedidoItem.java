package fatec.ads.hortfruti.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PedidoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigo;
    private int pedidoId;       // FK para Pedido.codigo
    private int produtoId;      // FK para Produto.codigo
    private int quantidade;
    private double preco;       // preço unitário no momento da compra
}