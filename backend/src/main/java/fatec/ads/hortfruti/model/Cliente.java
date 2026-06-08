package fatec.ads.hortfruti.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigo;
    private String nome;
    @Column(unique = true)
    private String email;
    private String documento;
    private String telefone;
    private String logradouro;
    private String senha;
    private String dataNascimento;
}