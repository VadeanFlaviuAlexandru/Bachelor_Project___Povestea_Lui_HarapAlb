package HarapAlb.HarapAlbBackend.services.leaderboard;

import HarapAlb.HarapAlbBackend.dto.leaderboard.LeaderboardResponse;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameResponse;
import HarapAlb.HarapAlbBackend.models.MiniGame;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.MiniGameRepository;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LeaderboardServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private MiniGameRepository miniGameRepository;

    @InjectMocks
    private LeaderboardService leaderboardService;

    @Test
    public void getLeaderboardSuccessfully() {
        List<User> users = Collections.singletonList(Mockito.mock(User.class));
        when(userRepository.getUsersWithMiniGames()).thenReturn(users);
        List<LeaderboardResponse> result = leaderboardService.getLeaderboard();
        assertNotNull(result);
    }

    @Test
    public void convertToMiniGameRequestListSuccessfully() {
        MiniGame mockMiniGame = Mockito.mock(MiniGame.class);
        when(mockMiniGame.getScore()).thenReturn(42);
        List<MiniGame> miniGames = Collections.singletonList(mockMiniGame);
        List<MiniGameRequest> result = leaderboardService.convertToMiniGameRequestList(miniGames);
        Assertions.assertNotNull(result);
    }
}