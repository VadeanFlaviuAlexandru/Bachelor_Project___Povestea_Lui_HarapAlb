package HarapAlb.HarapAlbBackend.exceptions.auth;

public class AuthenticateException extends RuntimeException {
    public AuthenticateException() {
        super("Couldn't sign in with those credentials. Please check them again!");
    }
}