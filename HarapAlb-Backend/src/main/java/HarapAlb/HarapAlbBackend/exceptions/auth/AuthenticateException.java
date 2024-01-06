package HarapAlb.HarapAlbBackend.exceptions.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)

public class AuthenticateException extends RuntimeException {
    public AuthenticateException() {
        super("Couldn't sign in with those credentials. Please check them again!");
    }
}