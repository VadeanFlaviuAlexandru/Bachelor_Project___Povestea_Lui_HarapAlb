package HarapAlb.HarapAlbBackend.controllers.auth;

import HarapAlb.HarapAlbBackend.dto.auth.SignInRequest;
import HarapAlb.HarapAlbBackend.dto.auth.SignInResponse;
import HarapAlb.HarapAlbBackend.dto.auth.SignUpRequest;
import HarapAlb.HarapAlbBackend.exceptions.auth.AuthenticateException;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import HarapAlb.HarapAlbBackend.services.auth.AuthenticationService;
import HarapAlb.HarapAlbBackend.services.user.UserService;
import io.jsonwebtoken.lang.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class AuthenticationControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserService userService;

    @Mock
    private AuthenticationService authenticationService;


    @InjectMocks
    private AuthenticationController authenticationController;

    @Test
    public void signUpButEmailAlreadyExists() {
        String userEmail = "a@a.com";
        User mockUser = Mockito.mock(User.class);
        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(mockUser));
        Optional<User> result = userRepository.findByEmail(userEmail);
        Assertions.assertTrue(result.isPresent());
        Assertions.assertSame(mockUser, result.get());
    }

    @Test
    public void signUpSuccessfully() {
        User user = new User();
        SignUpRequest mockRequest = Mockito.mock(SignUpRequest.class);
        when(authenticationService.signup(any(SignUpRequest.class))).thenReturn(user);
        ResponseEntity<String> response = authenticationController.signup(mockRequest);
        verify(authenticationService).signup(mockRequest);
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assertions.assertEquals("User registered successfully", response.getBody());
    }

    @Test
    public void signInButEmailDoesntExists() {
        String email = "a@a.com";
        when(userRepository.findByEmail(email))
                .thenThrow(new AuthenticateException());
        Assertions.assertThrows(AuthenticateException.class, () -> userRepository.findByEmail(email));
    }

    @Test
    public void signInSuccessfully() {
        String requestEmail = "a@a.com";
        User mockUser = Mockito.mock(User.class);
        SignInRequest mockRequest = Mockito.mock(SignInRequest.class);
        SignInResponse mockResponse = Mockito.mock(SignInResponse.class);
        when(userRepository.findByEmail(requestEmail)).thenReturn(Optional.of(mockUser));
        when(authenticationService.signin(mockUser,mockRequest)).thenReturn(mockResponse);
        Optional<User> userOptional = userRepository.findByEmail(requestEmail);
        Assertions.assertTrue(userOptional.isPresent());
        User user = userOptional.get();
        SignInResponse result = authenticationService.signin(user,mockRequest);
        Assertions.assertNotNull(result);
    }
}