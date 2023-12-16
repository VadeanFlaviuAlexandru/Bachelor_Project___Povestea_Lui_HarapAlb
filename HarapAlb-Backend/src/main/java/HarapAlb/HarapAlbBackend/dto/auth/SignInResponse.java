package HarapAlb.HarapAlbBackend.dto.auth;


import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.models.User;

import java.util.List;

public record SignInResponse(
        String token,
        User user,
        List<MiniGameRequest> miniGamesScore
) {
}