package HarapAlb.HarapAlbBackend.controllers.leaderboard;

import HarapAlb.HarapAlbBackend.dto.leaderboard.LeaderboardResponse;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameResponse;
import HarapAlb.HarapAlbBackend.exceptions.user.UserNotFoundException;
import HarapAlb.HarapAlbBackend.models.MiniGame;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.MiniGameRepository;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import HarapAlb.HarapAlbBackend.services.leaderboard.LeaderboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/SfantaDuminica")
@RequiredArgsConstructor
public class LeaderboardController {

    private final LeaderboardService leaderboardService;
    private final UserRepository userRepository;
    private final MiniGameRepository miniGameRepository;

    @GetMapping("/leaderboard")
    public List<LeaderboardResponse> getLeaderboard() {
        return leaderboardService.getLeaderboard();
    }

    @PostMapping("/leaderboard/add/{id}")
    public MiniGameResponse addScore(@RequestBody MiniGameRequest request, @PathVariable long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        return leaderboardService.addScore(request, user);
    }

    @PutMapping("/leaderboard/edit/{id}")
    public MiniGameResponse editScore(@RequestBody MiniGameRequest request, @PathVariable long id) {
        return leaderboardService.editScore(request);
    }
}