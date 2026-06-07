package fatec.ads.hortfruti.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int codigo;
    private int clienteId;      // FK para Cliente.codigo
    private LocalDateTime data;
    private double total;
}