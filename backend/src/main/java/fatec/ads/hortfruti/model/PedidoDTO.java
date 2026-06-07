package fatec.ads.hortfruti.model;

import lombok.Data;
import java.util.List;

@Data
public class PedidoDTO {
    private int clienteId;
    private List<ItemCestaDTO> itens;
    private double total;

    @Data
    public static class ItemCestaDTO {
        private int produtoId;
        private int quantidade;
        private double preco;   // preço unitário (valor ou promo)
    }
}