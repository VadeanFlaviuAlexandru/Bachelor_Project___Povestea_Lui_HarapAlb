package HarapAlb.HarapAlbBackend.exceptions.user;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(long id) {
        super("Couldn't find a user with id" + id);
    }
}