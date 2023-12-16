package HarapAlb.HarapAlbBackend.config;

import HarapAlb.HarapAlbBackend.enums.Role;
import HarapAlb.HarapAlbBackend.models.MiniGame;
import HarapAlb.HarapAlbBackend.models.User;
import HarapAlb.HarapAlbBackend.repositories.MiniGameRepository;
import HarapAlb.HarapAlbBackend.repositories.UserRepository;
import HarapAlb.HarapAlbBackend.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class SeedDataConfig implements CommandLineRunner {

    private final UserRepository userRepository;
    private final MiniGameRepository miniGameRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.count() == 0) {
            List<MiniGame> minigames = new ArrayList<>();

            User admin = User
                    .builder()
                    .firstName("admin")
                    .lastName("admin")
                    .email("admin@admin.com")
                    .password(passwordEncoder.encode("password"))
                    .miniGamesScore(minigames)
                    .role(Role.ROLE_ADMIN)
                    .build();
            userService.save(admin);

            MiniGame minigame = MiniGame
                    .builder()
                    .name("admin_minigame")
                    .score(200)
                    .user(admin)
                    .build();
            miniGameRepository.save(minigame);

            minigames.add(minigame);

            List<MiniGame> minigames2 = new ArrayList<>();

            User user = User
                    .builder()
                    .firstName("user")
                    .lastName("ionel")
                    .email("i@i.com")
                    .password(passwordEncoder.encode("password"))
                    .miniGamesScore(minigames2)
                    .role(Role.ROLE_USER)
                    .build();

            userService.save(user);

            MiniGame minigame2 = MiniGame
                    .builder()
                    .name("user_minigame")
                    .score(200)
                    .user(user)
                    .build();

            miniGameRepository.save(minigame2);
            minigames.add(minigame2);
        }
    }

}
