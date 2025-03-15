import { NavigateFunction, useNavigate } from "react-router";
import React, { useCallback, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

import Alert from "@mui/material/Alert";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Logo from "../../assets/logo.png";
import SpsLogo from "../../assets/sps_logo.webp";
import TextField from "../../components/Form/TextField";
import Typography from "@mui/material/Typography";
import { auth } from "../../services/Firebase/firebase";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { user } = useAuth();
  const navigate: NavigateFunction = useNavigate();
  const { t } = useTranslation();

  const [uid, setUid] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigateWithDelay = useCallback(
    (seconds: number) => {
      setTimeout(function () {
        navigate("/login");
      }, seconds * 1000);
    },
    [navigate]
  );

  const onSubmit = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        setUid(user.uid);
        setError("");

        // By default, it automatically logs you in. So we log out and redirect you to login.
        signOut(auth).then(() => navigateWithDelay(5));
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  // Due to the requirement, we must continue to display the UID. Otherwise, we'll redirect to the main page.
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (user && !uid) {
        navigate("/");
      }
    }

    return () => {
      mounted = false;
    };
  }, [navigate, uid, user]);

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        bgcolor: "primary.main",
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
          <Box component="form" px={10} onSubmit={onSubmit}>
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
              {t("create_your_account")}
            </Typography>

            {uid && (
              <Alert severity="info">
                {t("account_created", { uid: uid })}
              </Alert>
            )}

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
                  onClick={onSubmit}
                >
                  {t("create_your_account")}
                </Button>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Link href="/login">
                  <Typography variant="body1" color="secondary" align="center">
                    {t("already_have_account")}
                  </Typography>
                </Link>
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
    </Grid>
  );
};

export default Signup;
