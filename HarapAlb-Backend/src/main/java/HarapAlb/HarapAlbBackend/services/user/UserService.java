package HarapAlb.HarapAlbBackend.services.user;

import HarapAlb.HarapAlbBackend.dto.data.UserDto;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
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

    public UserDto create(UserDto userDto) {
        User user = new User();
        BeanUtils.copyProperties(userDto, user);
        User savedUser = userRepository.save(user);
        UserDto savedUserDto = new UserDto();
        BeanUtils.copyProperties(savedUser, savedUserDto);
        return savedUserDto;
    }
}
