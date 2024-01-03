package HarapAlb.HarapAlbBackend.services.auth;

import HarapAlb.HarapAlbBackend.dto.auth.SignInRequest;
import HarapAlb.HarapAlbBackend.dto.auth.SignInResponse;
import HarapAlb.HarapAlbBackend.dto.data.UserDto;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.enums.Role;
import HarapAlb.HarapAlbBackend.exceptions.auth.AuthenticateException;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.MiniGameRepository;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import HarapAlb.HarapAlbBackend.services.jwt.JwtService;
import HarapAlb.HarapAlbBackend.services.user.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {
    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private MiniGameRepository miniGameRepository;

    @Mock
    private JwtService jwtService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private UserService userService;

    @Test
    public void createUserSuccessfully() {
        User user = new User();
        UserDto userDto = UserDto.builder().firstName("AlexTest").lastName("VadeanTest")
                .email("test@test.com").password("password").role(Role.ROLE_USER).build();
        BeanUtils.copyProperties(userDto, user);
        when(userRepository.save(Mockito.any(User.class))).thenReturn(user);
        UserDto savedUser = userService.create(userDto);
        Assertions.assertNotNull(savedUser);
    }

    @Test
    public void createUserButFirstNameIsNull() {
        UserDto userDto = UserDto.builder().lastName("VadeanTest")
                .email("test@test.com").password("password").role(Role.ROLE_USER).build();
        when(userRepository.save(Mockito.any(User.class)))
                .thenThrow(new DataIntegrityViolationException("Simulated error: firstName cannot be null"));
        Assertions.assertThrows(DataIntegrityViolationException.class, () -> userService.create(userDto));
    }

    @Test
    public void createUserButLastNameIsNull() {
        UserDto userDto = UserDto.builder().firstName("AlexTest")
                .email("test@test.com").password("password").role(Role.ROLE_USER).build();
        when(userRepository.save(Mockito.any(User.class)))
                .thenThrow(new DataIntegrityViolationException("Simulated error: lastName cannot be null"));
        Assertions.assertThrows(DataIntegrityViolationException.class, () -> userService.create(userDto));
    }

    @Test
    public void createUserButEmailIsNull() {
        UserDto userDto = UserDto.builder().firstName("AlexTest").lastName("VadeanTest")
                .password("password").role(Role.ROLE_USER).build();
        when(userRepository.save(Mockito.any(User.class)))
                .thenThrow(new DataIntegrityViolationException("Simulated error: email cannot be null"));
        Assertions.assertThrows(DataIntegrityViolationException.class, () -> userService.create(userDto));
    }

    @Test
    public void createUserButPasswordIsNull() {
        UserDto userDto = UserDto.builder().firstName("AlexTest").lastName("VadeanTest")
                .email("test@test.com").role(Role.ROLE_USER).build();
        when(userRepository.save(Mockito.any(User.class)))
                .thenThrow(new DataIntegrityViolationException("Simulated error: password cannot be null"));
        Assertions.assertThrows(DataIntegrityViolationException.class, () -> userService.create(userDto));
    }

    @Test
    public void signInButPasswordDoesntMatch() {
        SignInRequest mockRequest = Mockito.mock(SignInRequest.class);
        User mockUser = Mockito.mock(User.class);
        when(passwordEncoder.matches(mockRequest.getPassword(), mockUser.getPassword()))
                .thenThrow(new AuthenticateException());
        Assertions.assertThrows(AuthenticateException.class, () -> passwordEncoder.matches(mockRequest.getPassword(), mockUser.getPassword()));
    }

    @Test
    public void signInSuccessfully() {
        SignInRequest mockRequest = Mockito.mock(SignInRequest.class);
        SignInResponse mockResponse = Mockito.mock(SignInResponse.class);
        User mockUser = Mockito.mock(User.class);
        when(authenticationService.signin(mockUser,mockRequest)).thenReturn(mockResponse);
        SignInResponse result = authenticationService.signin(mockUser, mockRequest);
        Assertions.assertNotNull(result);
    }
}