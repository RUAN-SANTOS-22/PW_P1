package fatec.ads.hortfruti.controller;

import fatec.ads.hortfruti.model.Cliente;
import fatec.ads.hortfruti.repository.ClienteRepository;
import fatec.ads.hortfruti.service.Ferramenta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteRepository bd;

    @Autowired
    private Ferramenta ferramenta;

    @PostMapping("/api/cliente")
    public void gravar(@RequestBody Cliente obj) {
        bd.save(obj);
        ferramenta.enviarEmail(obj.getEmail(),
                "Bem-vindo ao HortaFresh!",
                "Seu cadastro foi realizado com sucesso. Obrigado pela preferência.");
    }

    @PutMapping("/api/cliente")
    public void alterar(@RequestBody Cliente obj) {
        bd.save(obj);
    }

    @GetMapping("/api/cliente/{codigo}")
    public Cliente carregar(@PathVariable int codigo) {
        return bd.findById(codigo).orElse(new Cliente());
    }

    @DeleteMapping("/api/cliente/{codigo}")
    public void remover(@PathVariable int codigo) {
        bd.deleteById(codigo);
    }

    @GetMapping("/api/clientes")
    public List<Cliente> listar() {
        return bd.findAll();
    }

    @PostMapping("/api/cliente/fazerLogin")
    public Cliente fazerLogin(@RequestBody Cliente obj) {
        Optional<Cliente> retorno = bd.fazerLogin(obj.getEmail(), obj.getSenha());
        return retorno.orElse(new Cliente());
    }
}