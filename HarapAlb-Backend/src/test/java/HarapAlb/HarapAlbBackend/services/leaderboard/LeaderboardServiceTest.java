package HarapAlb.HarapAlbBackend.services.leaderboard;

import HarapAlb.HarapAlbBackend.dto.leaderboard.LeaderboardResponse;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameResponse;
import HarapAlb.HarapAlbBackend.enums.Role;
import HarapAlb.HarapAlbBackend.exceptions.exceptions.MiniGameNotFoundException;
import HarapAlb.HarapAlbBackend.models.MiniGame;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.MiniGameRepository;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class LeaderboardServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private MiniGameRepository miniGameRepository;

    @InjectMocks
    private LeaderboardService leaderboardService;

    @Test
    @DisplayName("Test leaderboard with success")
    public void testGetLeaderboardSuccessfully() throws Exception {
        List<MiniGame> miniGames = new ArrayList<>();
        List<User> users = Arrays.asList(
                new User(1, "fName1", "lName1",
                        "eMail1", "password1",
                        Role.ROLE_USER, miniGames),
                new User(2, "fName2", "lName2",
                        "eMail2", "password2",
                        Role.ROLE_USER, miniGames)
        );

        when(userRepository.getUsersWithMiniGames()).thenReturn(users);

        List<LeaderboardResponse> result = leaderboardService.getLeaderboard();

        assertNotNull(result);
        assertEquals(users.size(), result.size());
        verify(userRepository, times(1)).getUsersWithMiniGames();
    }

    @Test
    @DisplayName("Test conversion of MiniGames List to MiniGameRequest List")
    public void testConvertToMiniGameRequestListSuccessfully() throws Exception {
        List<MiniGame> miniGames = new ArrayList<>();

        List<MiniGameRequest> result = leaderboardService.convertToMiniGameRequestList(miniGames);

        assertNotNull(result);
    }

    @Test
    @DisplayName("Test of adding score")
    public void testAddScoreSuccessfully() throws Exception {
        MiniGameRequest miniGameRequest = new MiniGameRequest(0, "mgName", 100);
        User user = new User(1, "fName", "lName",
                "eMail", "password",
                Role.ROLE_USER, null);
        MiniGame miniGame = new MiniGame(0, "mgName", 100, user);

        when(miniGameRepository.save(miniGame)).thenReturn(miniGame);

        MiniGameResponse result = leaderboardService.addScore(miniGameRequest, user);

        assertNotNull(result);
        assertThat(result.score(), equalTo(miniGame.getScore()));
        assertThat(result.id(), equalTo(miniGame.getId()));
        assertThat(result.name(), equalTo(miniGame.getName()));
        verify(miniGameRepository, times(1)).save(miniGame);
    }

    @Test
    @DisplayName("Test edit score but couldn't find the MiniGame")
    public void testEditScoreNoMiniGameFound() throws Exception {
        MiniGameRequest miniGameRequest = new MiniGameRequest(0, "mgName", 100);
        MiniGame miniGame = new MiniGame();

        when(miniGameRepository.findById(miniGameRequest.getId()))
                .thenThrow(new MiniGameNotFoundException(miniGameRequest.getId()));

        assertThrows(MiniGameNotFoundException.class,
                () -> leaderboardService.editScore(miniGameRequest));
        verify(miniGameRepository, times(1)).findById(miniGameRequest.getId());
        verify(miniGameRepository, times(0)).save(miniGame);
    }

    @Test
    @DisplayName("Test edit score successfully")
    public void testEditScoreSuccessfully() throws Exception {
        MiniGameRequest miniGameRequest = new MiniGameRequest(4, "mgName24", 2000);
        MiniGame miniGame = new MiniGame();

        when(miniGameRepository.findById(miniGameRequest.getId())).thenReturn(Optional.of(miniGame));
        when(miniGameRepository.save(miniGame)).thenReturn(miniGame);

        MiniGameResponse result = leaderboardService.editScore(miniGameRequest);

        assertThat(result.score(), equalTo(miniGame.getScore()));
        assertThat(result.id(), equalTo(miniGame.getId()));
        assertThat(result.name(), equalTo(miniGame.getName()));
        verify(miniGameRepository, times(1)).findById(miniGameRequest.getId());
        verify(miniGameRepository, times(1)).save(miniGame);
    }
}