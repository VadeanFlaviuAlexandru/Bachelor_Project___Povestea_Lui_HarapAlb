package HarapAlb.HarapAlbBackend.services.auth;

import HarapAlb.HarapAlbBackend.dto.auth.SignInRequest;
import HarapAlb.HarapAlbBackend.dto.auth.SignInResponse;
import HarapAlb.HarapAlbBackend.dto.auth.SignUpRequest;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.enums.Role;
import HarapAlb.HarapAlbBackend.exceptions.auth.AuthenticateException;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.services.jwt.JwtService;
import HarapAlb.HarapAlbBackend.services.user.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.samePropertyValuesAs;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserService userService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    @Test
    @DisplayName("Test sign up with success")
    public void testSignUpSuccessful() throws Exception {
        SignUpRequest signUpRequest = new SignUpRequest("fName", "lName",
                "eMail", "password");
        User user = new User(0, signUpRequest.getFirstName(), signUpRequest.getLastName(),
                signUpRequest.getEmail(), signUpRequest.getPassword(), Role.ROLE_USER, null);
        User userSaved = new User(1, "fName", "lName",
                "eMail", "password",
                Role.ROLE_USER, null);

        when(userService.save(user)).thenReturn(userSaved);
        when(passwordEncoder.encode("password")).thenReturn("password");

        User result = authenticationService.signup(signUpRequest);

        assertThat(result, samePropertyValuesAs(userSaved));
        verify(userService, times(1)).save(user);
        verify(passwordEncoder, times(1)).encode(signUpRequest.getPassword());
    }

    @Test
    @DisplayName("Test sign in with success")
    public void testSignInSuccessful() throws Exception {
        User user = new User(1, "fName", "lName",
                "eMail", "password",
                Role.ROLE_USER, null);
        SignInRequest signInRequest = new SignInRequest();
        List<MiniGameRequest> minigames = new ArrayList<>();

        when(passwordEncoder.matches(signInRequest.getPassword(),
                user.getPassword())).thenReturn(true);
        when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signInRequest.getEmail(),
                signInRequest.getPassword())))
                .thenReturn(null);
        when(jwtService.generateToken(user)).thenReturn("token");

        SignInResponse result = authenticationService.signin(user, signInRequest, minigames);

        assertThat(result.token(), equalTo("token"));
        assertThat(result.user(), samePropertyValuesAs (user));
        assertThat(result.miniGamesScore(), equalTo(minigames));
        verify(passwordEncoder, times(1)).matches(signInRequest.getPassword(),
                user.getPassword());
        verify(authenticationManager, times(1)).authenticate(new UsernamePasswordAuthenticationToken(
                signInRequest.getEmail(),
                signInRequest.getPassword()));
        verify(jwtService, times(1)).generateToken(user);
    }

    @Test
    @DisplayName("Test sign in but the password doesn't match")
    public void testSignInWrongPassword() throws Exception{
        SignInRequest signInRequest = new SignInRequest();
        List<MiniGameRequest> minigames = new ArrayList<>();
        User user = new User();

        when(passwordEncoder.matches(signInRequest.getPassword(),
                user.getPassword())).thenThrow(new AuthenticateException());

        assertThrows(AuthenticateException.class,()->authenticationService.signin(user, signInRequest, minigames));

        verify(passwordEncoder, times(1)).matches(signInRequest.getPassword(),
                user.getPassword());
        verify(authenticationManager, times(0)).authenticate(new UsernamePasswordAuthenticationToken(
                signInRequest.getEmail(),
                signInRequest.getPassword()));
        verify(jwtService, times(0)).generateToken(user);
    }
}