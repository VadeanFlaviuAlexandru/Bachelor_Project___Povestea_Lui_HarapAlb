package HarapAlb.HarapAlbBackend.services.leaderboard;

import HarapAlb.HarapAlbBackend.dto.leaderboard.LeaderboardResponse;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.models.MiniGame;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.MiniGameRepository;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final UserRepository userRepository;

    public List<LeaderboardResponse> getLeaderboard() {
        List<User> users = userRepository.getUsersWithMiniGames();

        return users.parallelStream()
                .map(user -> new LeaderboardResponse(user.getId(), user.getLastName(), convertToMiniGameRequestList(user.getMiniGamesScore())))
                .collect(Collectors.toList());
    }

    private List<MiniGameRequest> convertToMiniGameRequestList(List<MiniGame> miniGames) {
        return miniGames.stream()
                .map(miniGame -> new MiniGameRequest(miniGame.getName(), miniGame.getScore()))
                .collect(Collectors.toList());
    }
}

