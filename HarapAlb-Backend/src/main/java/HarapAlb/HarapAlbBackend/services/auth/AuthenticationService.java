package HarapAlb.HarapAlbBackend.services.auth;

import HarapAlb.HarapAlbBackend.dto.auth.SignInRequest;
import HarapAlb.HarapAlbBackend.dto.auth.SignInResponse;
import HarapAlb.HarapAlbBackend.dto.auth.SignUpRequest;
import HarapAlb.HarapAlbBackend.dto.minigame.MiniGameRequest;
import HarapAlb.HarapAlbBackend.enums.Role;
import HarapAlb.HarapAlbBackend.exceptions.auth.AuthenticateException;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.MiniGameRepository;
import HarapAlb.HarapAlbBackend.services.jwt.JwtService;
import HarapAlb.HarapAlbBackend.services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public User signup(SignUpRequest request) {
        var user = User
                .builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();

        return userService.save(user);
    }


    public SignInResponse signin(User user, SignInRequest request, List<MiniGameRequest> minigames) {
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthenticateException();
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var jwt = jwtService.generateToken(user);
        return new SignInResponse(jwt, user, minigames);
    }

}
