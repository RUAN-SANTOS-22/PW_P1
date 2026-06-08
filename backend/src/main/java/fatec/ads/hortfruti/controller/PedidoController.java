package fatec.ads.hortfruti.controller;

import fatec.ads.hortfruti.model.*;
import fatec.ads.hortfruti.repository.*;
import fatec.ads.hortfruti.service.Ferramenta;

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

    @Autowired
    private Ferramenta ferramenta;

    @Autowired
    private ClienteRepository clienteRepository;

@PostMapping("/api/pedido")
public void finalizarPedido(@RequestBody PedidoDTO request) {

    // 1. Validar estoque
    for (PedidoDTO.ItemCestaDTO itemDto : request.getItens()) {
        Produto prod = produtoRepository.findById(itemDto.getProdutoId()).orElse(null);
        if (prod != null && prod.getQuantidade() < itemDto.getQuantidade()) {
            return;
        }
    }

    // 2. Salvar pedido
    Pedido pedido = new Pedido();
    pedido.setClienteId(request.getClienteId());
    pedido.setData(LocalDateTime.now());
    pedido.setTotal(request.getTotal());
    pedido = pedidoRepository.save(pedido);

    // 3. Salvar itens e atualizar estoque
    StringBuilder corpo = new StringBuilder("Seu pedido foi realizado com sucesso!\n\nItens:\n");
    for (PedidoDTO.ItemCestaDTO itemDto : request.getItens()) {
        PedidoItem item = new PedidoItem();
        item.setPedidoId(pedido.getCodigo());
        item.setProdutoId(itemDto.getProdutoId());
        item.setQuantidade(itemDto.getQuantidade());
        item.setPreco(itemDto.getPreco());
        itemRepository.save(item);

        Produto prod = produtoRepository.findById(itemDto.getProdutoId()).orElse(null);
        if (prod != null) {
            prod.setQuantidade(prod.getQuantidade() - itemDto.getQuantidade());
            produtoRepository.save(prod);
            corpo.append("- ").append(prod.getNome())
                 .append(" x").append(itemDto.getQuantidade())
                 .append(" = R$ ").append(String.format("%.2f", itemDto.getPreco() * itemDto.getQuantidade()))
                 .append("\n");
        }
    }
    corpo.append("\nTotal: R$ ").append(String.format("%.2f", request.getTotal()));
    
    // 4. Enviar email
    clienteRepository.findById(request.getClienteId()).ifPresent(cliente ->
        ferramenta.enviarEmail(cliente.getEmail(), "Pedido realizado - HortaFresh", corpo.toString())
    );
    //     Optional<Cliente> cliente = clienteRepository.findById(request.getClienteId());
    // System.out.println("ClienteId recebido: " + request.getClienteId());
    // System.out.println("Cliente encontrado: " + cliente.isPresent());
    // if (cliente.isPresent()) {
    //     System.out.println("Enviando email para: " + cliente.get().getEmail());
    //     ferramenta.enviarEmail(cliente.get().getEmail(), "Pedido realizado - HortaFresh", corpo.toString());
    //     System.out.println("Email enviado!");
    // }
}
 
    @GetMapping("/api/pedido/cliente/{clienteId}")
    public List<Pedido> listarPedidosPorCliente(@PathVariable int clienteId) {
        return pedidoRepository.findByClienteId(clienteId);
    }
}