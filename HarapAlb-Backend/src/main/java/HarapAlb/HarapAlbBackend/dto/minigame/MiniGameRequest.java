package HarapAlb.HarapAlbBackend.dto.minigame;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MiniGameRequest {
    private long id;
    private String name;
    private int score;


    public MiniGameRequest(long id, String name, int score) {
        this.id = id;
        this.name = name;
        this.score = score;
    }
}
