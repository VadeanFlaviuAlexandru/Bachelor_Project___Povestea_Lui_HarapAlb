package HarapAlb.HarapAlbBackend.repositories;

import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.models.MiniGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MiniGameRepository extends JpaRepository<MiniGame, Long> {

    @Query("""
            SELECT NEW HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest(m.name, m.score) 
            FROM MiniGame m WHERE m.user.id = :id
            """)
    List<MiniGameRequest> findMiniGamesByUserId(@Param("id") long userId);

    List<MiniGame> findByUserId(long id);
}