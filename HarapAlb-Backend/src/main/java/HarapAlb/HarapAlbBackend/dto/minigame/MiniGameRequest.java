package HarapAlb.HarapAlbBackend.dto.minigame;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MiniGameRequest {
    private String name;
    private int score;


    public MiniGameRequest(String name, int score) {
        this.name = name;
        this.score = score;
    }
}
