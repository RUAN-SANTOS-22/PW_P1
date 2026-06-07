package fatec.ads.hortfruti.controller;

import fatec.ads.hortfruti.model.*;
import fatec.ads.hortfruti.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoItemRepository itemRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping("/api/pedido")
    public void finalizarPedido(@RequestBody PedidoDTO request) {
        // 1. Salvar o pedido
        Pedido pedido = new Pedido();
        pedido.setClienteId(request.getClienteId());
        pedido.setData(LocalDateTime.now());
        pedido.setTotal(request.getTotal());
        pedido = pedidoRepository.save(pedido);

        // 2. Salvar cada item e atualizar estoque
        for (PedidoDTO.ItemCestaDTO itemDto : request.getItens()) {
            PedidoItem item = new PedidoItem();
            item.setPedidoId(pedido.getCodigo());
            item.setProdutoId(itemDto.getProdutoId());
            item.setQuantidade(itemDto.getQuantidade());
            item.setPreco(itemDto.getPreco());
            itemRepository.save(item);

            // Atualizar estoque do produto
            Produto prod = produtoRepository.findById(itemDto.getProdutoId()).orElse(null);
            if (prod != null) {
                prod.setQuantidade(prod.getQuantidade() - itemDto.getQuantidade());
                produtoRepository.save(prod);
            }
        }
    }

    @GetMapping("/api/pedido/cliente/{clienteId}")
    public List<Pedido> listarPedidosPorCliente(@PathVariable int clienteId) {
        return pedidoRepository.findByClienteId(clienteId);
    }
}