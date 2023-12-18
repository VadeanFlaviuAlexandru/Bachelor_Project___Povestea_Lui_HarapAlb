package HarapAlb.HarapAlbBackend.services.user;

import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public User save(User newUser) {
        return userRepository.save(newUser);
    }

}
