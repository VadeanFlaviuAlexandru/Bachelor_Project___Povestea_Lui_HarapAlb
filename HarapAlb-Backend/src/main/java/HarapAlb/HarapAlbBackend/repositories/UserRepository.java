package HarapAlb.HarapAlbBackend.repositories;

import HarapAlb.HarapAlbBackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT DISTINCT u FROM User u INNER JOIN FETCH u.miniGamesScore ms ORDER BY ms.score DESC")
    List<User> getUsersWithMiniGames();
}
