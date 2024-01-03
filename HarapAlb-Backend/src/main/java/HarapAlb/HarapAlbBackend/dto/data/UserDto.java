package HarapAlb.HarapAlbBackend.dto.data;

import HarapAlb.HarapAlbBackend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    String firstName;
    String lastName;
    String email;
    String password;
    Role role;
}