package fatec.ads.hortfruti.repository;

import fatec.ads.hortfruti.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Integer> {
    @Query(value = "SELECT * FROM produto WHERE destaque > 0 ORDER BY destaque, nome", nativeQuery = true)
    List<Produto> carregarVitrine();

    @Query(value = "SELECT * FROM produto WHERE keywords LIKE ?1 OR descritivo LIKE ?1", nativeQuery = true)
    List<Produto> fazerBusca(String termo);
}