package HarapAlb.HarapAlbBackend.services.leaderboard;

import HarapAlb.HarapAlbBackend.dto.leaderboard.LeaderboardResponse;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameResponse;
import HarapAlb.HarapAlbBackend.exceptions.exceptions.MiniGameNotFoundException;
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
    private final MiniGameRepository miniGameRepository;

    public List<LeaderboardResponse> getLeaderboard() {
        List<User> users = userRepository.getUsersWithMiniGames();

        return users.parallelStream()
                .map(user -> new LeaderboardResponse(user.getId(), user.getLastName(), convertToMiniGameRequestList(user.getMiniGamesScore())))
                .collect(Collectors.toList());
    }

    private List<MiniGameRequest> convertToMiniGameRequestList(List<MiniGame> miniGames) {
        return miniGames.stream()
                .map(miniGame -> new MiniGameRequest(miniGame.getId(), miniGame.getName(), miniGame.getScore()))
                .collect(Collectors.toList());
    }

    public MiniGameResponse addScore(MiniGameRequest request, User user) {
        MiniGame minigame = MiniGame.builder().user(user).name(request.getName()).score(request.getScore()).build();
        miniGameRepository.save(minigame);
        return new MiniGameResponse(minigame.getId(), minigame.getName(), minigame.getScore());
    }

    public MiniGameResponse editScore(MiniGameRequest request, long id) {
        MiniGame miniGame = miniGameRepository.findById(id).map(minigame -> {
            minigame.setScore(request.getScore());
            return miniGameRepository.save(minigame);
        }).orElseThrow(() -> new MiniGameNotFoundException(id));
        return new MiniGameResponse(miniGame.getId(), miniGame.getName(), miniGame.getScore());
    }
}