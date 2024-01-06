package HarapAlb.HarapAlbBackend.controllers.auth;

import HarapAlb.HarapAlbBackend.dto.auth.SignInRequest;
import HarapAlb.HarapAlbBackend.dto.auth.SignInResponse;
import HarapAlb.HarapAlbBackend.dto.auth.SignUpRequest;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.enums.Role;
import HarapAlb.HarapAlbBackend.exceptions.auth.AuthenticateException;
import HarapAlb.HarapAlbBackend.exceptions.user.EmailExistsException;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import HarapAlb.HarapAlbBackend.services.auth.AuthenticationService;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class AuthenticationControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        reset(userRepository, authenticationService);
    }

    @Test
    void TestSignUpSuccessful() throws Exception {
        SignUpRequest signUpRequest = new SignUpRequest();
        User user = new User();

        when(userRepository.findByEmail(signUpRequest.getEmail())).thenReturn(Optional.empty());
        when(authenticationService.signup(signUpRequest)).thenReturn(user);

        MvcResult mvcResult = mvc.perform(post("/SfantaDuminica/signUp")
                        .content(new ObjectMapper().writeValueAsString(signUpRequest))
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();

        assertEquals("User registered successfully", mvcResult.getResponse().getContentAsString());
        verify(userRepository, times(1)).findByEmail(signUpRequest.getEmail());
        verify(authenticationService, times(1)).signup(signUpRequest);
    }

    @Test
    void TestSignUpEmailAlreadyExists() throws Exception {
        SignUpRequest signUpRequest = new SignUpRequest();

        when(userRepository.findByEmail(signUpRequest.getEmail())).thenThrow(new EmailExistsException());

        MvcResult mvcResult = mvc.perform(post("/SfantaDuminica/signUp")
                        .content(new ObjectMapper().writeValueAsString(signUpRequest))
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
                .andExpect(status().isConflict()).andReturn();

        Throwable thrownException = mvcResult.getResolvedException();

        assertThrows(EmailExistsException.class, () -> {
            throw thrownException;
        });
        assertEquals("There's already an account with this e-mail!", thrownException.getMessage());
        verify(userRepository, times(1)).findByEmail(signUpRequest.getEmail());
        verify(authenticationService, times(0)).signup(signUpRequest);
    }

    @Test
    void TestSignInCantFindEmail() throws Exception {
        SignInRequest signInRequest = new SignInRequest();
        User user = new User();
        when(userRepository.findByEmail(signInRequest.getEmail())).thenThrow(new AuthenticateException());

        MvcResult mvcResult = mvc.perform(post("/SfantaDuminica/signIn")
                        .content(new ObjectMapper().writeValueAsString(signInRequest))
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized()).andReturn();

        Throwable thrownException = mvcResult.getResolvedException();

        assertThrows(AuthenticateException.class, () -> {
            throw thrownException;
        });
        verify(userRepository, times(1)).findByEmail(signInRequest.getEmail());
        verify(authenticationService, times(0)).signin(user, signInRequest);
    }

    @Test
    void TestSignInSuccessful() throws Exception {
        User user = new User(1, "fName", "lName",
                "eMail", "password",
                Role.ROLE_USER, null);
        SignInRequest signInRequest = new SignInRequest();
        List<MiniGameRequest> minigames = new ArrayList<>();
        SignInResponse signInResponse = new SignInResponse("token", user, minigames);

        when(userRepository.findByEmail(signInRequest.getEmail())).thenReturn(Optional.of(user));
        when(authenticationService.signin(user, signInRequest)).thenReturn(signInResponse);

        mvc.perform(post("/SfantaDuminica/signIn")
                        .content(new ObjectMapper().writeValueAsString(signInRequest))
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", is("token")))
                .andExpect(jsonPath("$.user.firstName", is("fName")))
                .andExpect(jsonPath("$.user.lastName", is("lName")))
                .andExpect(jsonPath("$.user.email", is("eMail")))
                .andExpect(jsonPath("$.user.role", is("ROLE_USER")))
                .andExpect(jsonPath("$.miniGamesScore", is(empty())))
                .andReturn();

        verify(userRepository, times(1)).findByEmail(signInRequest.getEmail());
        verify(authenticationService, times(1)).signin(user, signInRequest);
    }
}