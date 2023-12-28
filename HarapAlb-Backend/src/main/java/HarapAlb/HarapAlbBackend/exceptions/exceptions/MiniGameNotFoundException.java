package HarapAlb.HarapAlbBackend.exceptions.exceptions;

public class MiniGameNotFoundException extends RuntimeException {
    public MiniGameNotFoundException(long id) {
        super("Couldn't find a mini-game with id " + id);
    }


}
