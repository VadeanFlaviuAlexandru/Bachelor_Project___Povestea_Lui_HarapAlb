package HarapAlb.HarapAlbBackend.controllers.leaderboard;

import HarapAlb.HarapAlbBackend.dto.leaderboard.LeaderboardResponse;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameResponse;
import HarapAlb.HarapAlbBackend.exceptions.user.UserNotFoundException;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.MiniGameRepository;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import HarapAlb.HarapAlbBackend.services.leaderboard.LeaderboardService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LeaderboardControllerTest {

    @Mock
    private MiniGameRepository miniGameRepository;

    @Mock
    private LeaderboardService leaderboardService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private LeaderboardController leaderboardController;

    @Test
    public void getLeaderboardWithSuccess() {
        List<LeaderboardResponse> mockList = Collections.singletonList(Mockito.mock(LeaderboardResponse.class));
        when(leaderboardController.getLeaderboard()).thenReturn(mockList);
        List<LeaderboardResponse> result = leaderboardController.getLeaderboard();
        Assertions.assertNotNull(result);
    }

    @Test
    public void addScoreSuccessfully() {
        MiniGameRequest miniGameRequest = Mockito.mock(MiniGameRequest.class);
        MiniGameResponse miniGameResponse = Mockito.mock(MiniGameResponse.class);
        long id = 1;
        User mockUser = Mockito.mock(User.class);
        when(userRepository.findById(id)).thenReturn(Optional.of(mockUser));
        when(leaderboardService.addScore(miniGameRequest, mockUser)).thenReturn(miniGameResponse);
        MiniGameResponse result = leaderboardController.addScore(miniGameRequest, id);
        Assertions.assertNotNull(result);
    }

    @Test
    public void addScoreButCouldntFindUser() {
        MiniGameRequest miniGameRequest = Mockito.mock(MiniGameRequest.class);
        long id = 1;
        when(userRepository.findById(id)).thenThrow(new UserNotFoundException(id));
        Assertions.assertThrows(UserNotFoundException.class,()->leaderboardController.addScore(miniGameRequest,id));
    }

    @Test
    public void editScoreSuccessfully() {
        MiniGameRequest miniGameRequest = Mockito.mock(MiniGameRequest.class);
        MiniGameResponse miniGameResponse = Mockito.mock(MiniGameResponse.class);
        when(leaderboardService.editScore(miniGameRequest)).thenReturn(miniGameResponse);
        MiniGameResponse result = leaderboardController.editScore(miniGameRequest);
        Assertions.assertNotNull(result);
    }

}