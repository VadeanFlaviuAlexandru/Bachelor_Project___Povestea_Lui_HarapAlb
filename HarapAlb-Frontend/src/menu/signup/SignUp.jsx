import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUser } from "../../api/auth/AuthApi";
import { longWarningToast } from "../../utilities/notifications/Notifications";
import "./SignUp.scss";

export default function SignUp() {
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      longWarningToast(
        "Adresa de e-mail introdusă nu este validă. Te rog să o rescrii corect și să încerci din nou."
      );
      return;
    } else if (password.length < 5) {
      longWarningToast(
        "Să încercăm să creăm o parolă mai lungă de 5 caractere."
      );
      return;
    } else if (firstName.trim().length < 4) {
      longWarningToast(
        "Să încercăm să creăm un nume mai lungă de 4 caractere."
      );
      return;
    } else if (lastName.trim().length < 4) {
      longWarningToast(
        "Să încercăm să creăm un prenume mai lungă de 4 caractere."
      );
      return;
    }
    const payload = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    if (!isLoading) {
      setIsLoading(true);
      signUpUser(payload).then(() => {
        navigate("/");
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="contentContainer">
        <div className="title">
          <h1>Creeaza un cont</h1>
        </div>
        <div className="buttonsContainer">
          <form onSubmit={handleSubmit} action={<Link to="/login" />}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="primary"
                label="Nume"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                inputProps={{ maxLength: 20 }}
                fullWidth
                required
              />
              <TextField
                type="text"
                variant="outlined"
                color="primary"
                label="Prenume"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                inputProps={{ maxLength: 20 }}
                fullWidth
                required
              />
            </Stack>
            <TextField
              type="email"
              variant="outlined"
              color="primary"
              label="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              inputProps={{ maxLength: 50 }}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="password"
              variant="outlined"
              color="primary"
              label="Parola"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              inputProps={{ maxLength: 20 }}
              required
              fullWidth
              sx={{ mb: 4 }}
            />
            <div className="buttons">
              <Link to="/">
                <Button
                  className="button"
                  variant="contained"
                  color="warning"
                  size="large"
                >
                  Du-ma inapoi
                </Button>
              </Link>
              <Button
                className="button "
                variant="contained"
                color="success"
                type="submit"
              >
                Inregistreaza-ma
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
