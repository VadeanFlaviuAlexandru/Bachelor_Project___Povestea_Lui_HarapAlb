package HarapAlb.HarapAlbBackend.exceptions.user;

public class EmailExistsException extends RuntimeException {
    public EmailExistsException() {
        super("There's already an account with this e-mail!");
    }
}