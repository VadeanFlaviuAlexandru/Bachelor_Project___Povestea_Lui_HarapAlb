import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { warningToast } from "../../utilities/notifications/Notifications";
import "./SignUp.scss";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    warningToast("Sorry, backend not yet made! 😞 ");
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
                input
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
