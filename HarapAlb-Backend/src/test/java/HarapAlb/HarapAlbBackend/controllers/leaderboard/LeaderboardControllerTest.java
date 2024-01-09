package HarapAlb.HarapAlbBackend.controllers.leaderboard;

import HarapAlb.HarapAlbBackend.dto.leaderboard.LeaderboardResponse;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameResponse;
import HarapAlb.HarapAlbBackend.exceptions.user.UserNotFoundException;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import HarapAlb.HarapAlbBackend.services.leaderboard.LeaderboardService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.empty;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class LeaderboardControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private LeaderboardService leaderboardService;

    @BeforeEach
    void setUp() {
        reset(userRepository, leaderboardService);
    }

    @Test
    void TestGetLeaderboardSuccessful() throws Exception {
        List<LeaderboardResponse> leaderboardResponse = new ArrayList<>();

        when(leaderboardService.getLeaderboard()).thenReturn(leaderboardResponse);

        mvc.perform(get("/SfantaDuminica/leaderboard"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(empty())))
                .andReturn();

        verify(leaderboardService, times(1)).getLeaderboard();
    }

    @Test
    void TestAddScoreButUserNotFound() throws Exception {
        long id = 20;
        MiniGameRequest miniGameRequest = new MiniGameRequest(1, "fGame", 100);
        User user = new User();

        when(userRepository.findById(id)).thenThrow(new UserNotFoundException(id));

        MvcResult mvcResult = mvc.perform(post("/SfantaDuminica/leaderboard/add/20")
                        .content(new ObjectMapper().writeValueAsString(miniGameRequest))
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound()).andReturn();

        Throwable throwable = mvcResult.getResolvedException();

        assertThrows(UserNotFoundException.class, () -> {
            throw throwable;
        });
        assertEquals("Couldn't find a user with id 20", throwable.getMessage());
        verify(userRepository, times(1)).findById(id);
        verify(leaderboardService, times(0)).addScore(miniGameRequest, user);
    }

    @Test
    void TestAddScoreSuccessful() throws Exception {
        MiniGameRequest miniGameRequest = new MiniGameRequest(1, "fGame", 100);
        MiniGameResponse miniGameResponse = new MiniGameResponse(1, "fGame", 100);
        User user = new User();
        long id = 20;

        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(leaderboardService.addScore(miniGameRequest, user)).thenReturn(miniGameResponse);

        mvc.perform(post("/SfantaDuminica/leaderboard/add/20")
                        .content(new ObjectMapper().writeValueAsString(miniGameRequest))
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("fGame")))
                .andExpect(jsonPath("$.score", is(100)))
                .andReturn();

        verify(userRepository, times(1)).findById(id);
        verify(leaderboardService, times(1)).addScore(miniGameRequest, user);
    }

    @Test
    void TestEditScoreSuccessful() throws Exception {
        MiniGameRequest miniGameRequest = new MiniGameRequest(1, "fGame", 100);
        MiniGameResponse miniGameResponse = new MiniGameResponse(1, "fGame", 100);

        when(leaderboardService.editScore(miniGameRequest)).thenReturn(miniGameResponse);

        mvc.perform(put("/SfantaDuminica/leaderboard/edit")
                        .content(new ObjectMapper().writeValueAsString(miniGameRequest))
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("fGame")))
                .andExpect(jsonPath("$.score", is(100)))
                .andReturn();

        verify(leaderboardService, times(1)).editScore(miniGameRequest);
    }
}