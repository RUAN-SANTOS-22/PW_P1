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

    @PostMapping("/api/cliente/fazerLogin")
    public Cliente fazerLogin(@RequestBody Cliente obj){
        Optional<Cliente> retorno = bd.fazerLogin(obj.getEmail(), obj.getSenha());
        if(retorno.isPresent()){
            return retorno.get();
        } else {
            return new Cliente();
        }
    }
    @PostMapping("/api/cliente/esqueceuSenha")
    public void esqueceuSenha(@RequestBody Cliente obj) {
        Optional<Cliente> retorno = bd.buscarPorEmail(obj.getEmail());
        if (retorno.isPresent()) {
            Cliente cliente = retorno.get();
            ferramenta.enviarEmail(cliente.getEmail(),
                "Recuperação de senha - HortaFresh",
                "Olá " + cliente.getNome() + ", sua senha é: " + cliente.getSenha());
        }
    }
    @PostMapping("/api/contato")
    public void contato(@RequestBody java.util.Map<String, String> obj) {
        ferramenta.enviarEmail("hortafresh@email.com",
            "Contato - " + obj.get("assunto"),
            "De: " + obj.get("nome") + " <" + obj.get("email") + ">\n\n" + obj.get("mensagem"));
    }
}