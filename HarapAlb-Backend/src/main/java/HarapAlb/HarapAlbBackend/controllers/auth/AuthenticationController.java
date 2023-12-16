package HarapAlb.HarapAlbBackend.controllers.auth;

import HarapAlb.HarapAlbBackend.dto.auth.SignInRequest;
import HarapAlb.HarapAlbBackend.dto.auth.SignUpRequest;
import HarapAlb.HarapAlbBackend.dto.auth.SignInResponse;
import HarapAlb.HarapAlbBackend.exceptions.auth.AuthenticateException;
import HarapAlb.HarapAlbBackend.exceptions.user.EmailExistsException;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import HarapAlb.HarapAlbBackend.services.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/SfantaDuminica")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

    @PostMapping("/signUp")
    public ResponseEntity<String> signup(@RequestBody SignUpRequest request) {
        userRepository.findByEmail(request.getEmail()).ifPresent(user -> {
            throw new EmailExistsException();
        });
        authenticationService.signup(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/signIn")
    public SignInResponse signin(@RequestBody SignInRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(AuthenticateException::new);
        return authenticationService.signin(user, request);
    }
}