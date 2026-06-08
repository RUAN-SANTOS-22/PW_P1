package fatec.ads.hortfruti.repository;

import fatec.ads.hortfruti.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    @Query(value = "SELECT * FROM cliente WHERE email = ?1 AND senha = ?2", nativeQuery = true)
    Optional<Cliente> fazerLogin(String email, String senha);
    
    @Query(value = "SELECT * FROM cliente WHERE email = ?1", nativeQuery = true)
    Optional<Cliente> buscarPorEmail(String email);
}