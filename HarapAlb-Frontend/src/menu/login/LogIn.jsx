import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logInUser } from "../../api/auth/AuthApi";
import { userSetter } from "../../store/user/UserSlice";
import {
  longWarningToast,
  successToast,
} from "../../utilities/notifications/Notifications";
import "./LogIn.scss";

export default function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!emailRegex.test(email)) {
      longWarningToast(
        "Nu ai scris un e-mail valid! incearca din nou dupa ce l-ai scris corect."
      );
      return;
    }
    const payload = {
      email: email,
      password: password,
    };
    if (!isLoading) {
      setIsLoading(true);
      logInUser(payload).then((response) => {
        dispatch(userSetter(response));
        navigate("/phaser");
        successToast("Bun venit!");
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
                className="button"
                variant="contained"
                color="success"
                type="submit"
              >
                Intra in cont
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
