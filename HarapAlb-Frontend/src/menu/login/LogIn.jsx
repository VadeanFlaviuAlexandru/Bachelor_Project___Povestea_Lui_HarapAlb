import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logInUser } from "../../api/auth/AuthApi";
import CustomButton from "../../components/buttons/CustomButton";
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
        "Adresa de e-mail introdusă nu este validă. Te rog să o rescrii corect și să încerci din nou."
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
          <h1>Autentificare</h1>
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
                <CustomButton
                  text="Du-ma inapoi"
                  size="large"
                  color="warning"
                  className="button"
                />
              </Link>
              <CustomButton
                text="Intra in cont"
                className="button"
                color="success"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
