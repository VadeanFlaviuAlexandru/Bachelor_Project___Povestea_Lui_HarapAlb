package HarapAlb.HarapAlbBackend.exceptions.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class EmailExistsException extends RuntimeException {
    public EmailExistsException() {
        super("There's already an account with this e-mail!");
    }
}