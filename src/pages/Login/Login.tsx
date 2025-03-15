import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { NavigateFunction, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import {
  auth,
  facebookAuth,
  googleAuth,
} from "../../services/Firebase/firebase";

import Alert from "@mui/material/Alert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid2";
import Logo from "../../assets/logo.png";
import SpsLogo from "../../assets/sps_logo.webp";
import TextField from "../../components/Form/TextField";
import Typography from "@mui/material/Typography";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { user } = useAuth();

  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onLogin = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        navigate("/");
        setError("");
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  const onLoginWithProvider = async (
    provider: FacebookAuthProvider | GoogleAuthProvider
  ) => {
    try {
      //authenticate the user by calling a popup
      const user = await signInWithPopup(auth, provider);
      //fetch the user data
      console.log(user);
    } catch (e) {
      //handle the error when login fails
      console.log(`login error ${e}`);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && user) {
      navigate("/");
    }

    return () => {
      mounted = false;
    };
  }, [navigate, user]);

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
      spacing={2}
    >
      <Grid
        container
        size={{ sm: 12, md: 6 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          bgcolor: "primary.main",
        }}
      >
        <Grid
          container
          direction="row"
          size={{ xs: 12 }}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box component="form" px={10} onSubmit={onLogin}>
            <Grid
              container
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={Logo} height={200} />
            </Grid>

            <Typography
              variant="h2"
              color="secondary"
              align="center"
              sx={{ paddingBottom: "3rem" }}
            >
              {t("access_your_account")}
            </Typography>

   
            {error && (
              <Box my={2}>
                <Alert severity="error">{t(error)}</Alert>
              </Box>
            )}

            <TextField
              label={t("email")}
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              type="password"
              label={t("password")}
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(event.target.value);
              }}
            />

            <Grid container size={12} sx={{ paddingTop: "1rem" }} spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  type="submit"
                  onClick={onLogin}
                >
                  {t("sign_in")}
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={() => onLoginWithProvider(googleAuth)}
                >
                  {t("sign_in_provider", { provider: "Google" })}
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={() => onLoginWithProvider(facebookAuth)}
                >
                  {t("sign_in_provider", { provider: "Facebook" })}
                </Button>
              </Grid>
              <Grid
                container
                size={{ xs: 12 }}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={SpsLogo} height={50} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        size={{ sm: 12, md: 6 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          bgcolor: "secondary.main",
        }}
      >
        <Box p={10}>
          <Typography
            variant="h2"
            color="primary"
            align="center"
            sx={{ paddingBottom: "3rem" }}
          >
            {t("no_account_yet")}
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            align="center"
            sx={{ paddingBottom: "3rem" }}
          >
            {t("register_enjoy_benefits")}
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/signup")}
          >
            {t("sign_up")}
          </Button>
        </Box>
      </Grid>

      <Fab
        variant="extended"
        sx={{
          display: { xs: "flex", md: "none" },
          position: "absolute",
          left: `calc(50% - 100px)`,
          bottom: 30,
        }}
        onClick={() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }}
      >
        <ArrowDropDownIcon sx={{ mr: 2 }} />

        {t("no_account_yet")}
      </Fab>
    </Grid>
  );
};

export default Login;
