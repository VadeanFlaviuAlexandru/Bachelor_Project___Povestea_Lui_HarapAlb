package HarapAlb.HarapAlbBackend.dto.leaderboard;

import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LeaderboardResponse {
    long id;
    String lastName;
    List<MiniGameRequest> miniGamesScore;

    public LeaderboardResponse(long id, String lastName, List<MiniGameRequest> miniGamesScore) {
        this.id = id;
        this.lastName = lastName;
        this.miniGamesScore = miniGamesScore;
    }
}

