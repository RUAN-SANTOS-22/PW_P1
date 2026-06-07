package fatec.ads.hortfruti.controller;

import fatec.ads.hortfruti.model.Produto;
import fatec.ads.hortfruti.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository bd;

    @PostMapping("/api/produto")
    public void gravar(@RequestBody Produto obj) {
        bd.save(obj);
    }

    @PutMapping("/api/produto")
    public void alterar(@RequestBody Produto obj) {
        if (bd.existsById(obj.getCodigo()))
            bd.save(obj);
    }

    @DeleteMapping("/api/produto/{codigo}")
    public void remover(@PathVariable int codigo) {
        bd.deleteById(codigo);
    }

    @GetMapping("/api/produto/{codigo}")
    public Produto carregar(@PathVariable int codigo) {
        return bd.findById(codigo).orElse(new Produto());
    }

    @GetMapping("/api/produtos")
    public List<Produto> listar() {
        return bd.findAll();
    }

    @GetMapping("/api/produto/vitrine")
    public List<Produto> vitrine() {
        return bd.carregarVitrine();
    }

    @GetMapping("/api/produto/busca/{termo}")
    public List<Produto> buscar(@PathVariable String termo) {
        return bd.fazerBusca("%" + termo + "%");
    }
}