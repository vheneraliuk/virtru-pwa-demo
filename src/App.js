import React, { useState } from "react";
import { Button } from "virtru-design-system";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Stack,
  InputAdornment,
  TextField,
  Collapse,
} from "@mui/material";

import * as Virtru from "virtru-sdk";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [targetEmail, setTargetEmail] = useState("");
  const [code, setCode] = useState("");
  const [text, setText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  );
  const [sendCodeDisabled, setSendCodeDisabled] = useState(false);
  const [submitCodeDisabled, setSubmitCodeDisabled] = useState(true);

  function sendCode() {
    Virtru.Auth.sendCodeToEmail({
      email: email,
      // accountsUrl: "https://api.staging.virtru.com/accounts",
      // acmUrl: "https://api.staging.virtru.com/acm",
      // apiUrl: "https://api.staging.virtru.com",
    })
      .then((result) => {
        console.debug(`Code Sent - ${result}`);
        setSendCodeDisabled(true);
        setSubmitCodeDisabled(false);
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  }

  function submitCode() {
    Virtru.Auth.activateEmailCode({
      email: email,
      code: `V-${code}`,
      // accountsUrl: "https://api.staging.virtru.com/accounts",
      // acmUrl: "https://api.staging.virtru.com/acm",
      // apiUrl: "https://api.staging.virtru.com",
    })
      .then((result) => {
        console.debug(`Activated with code V-${code} - ${result}`);
        setSubmitCodeDisabled(true);
        checkLogIn();
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  }

  function checkLogIn() {
    let loggedIn = Virtru.Auth.isLoggedIn({ email: email });
    setLoggedIn(loggedIn);
    if (loggedIn) {
      console.debug(`Successfully logged in as ${email}`);
    } else {
      console.debug(`Login FAILED for ${email}`);
    }
  }

  function encryptText() {
    const sourceFileName = `VirtruPwaDemoApp_${Date.now()}.txt`;
    const policy = new Virtru.PolicyBuilder()
      .addUsersWithAccess([targetEmail])
      .build();

    const encryptParams = new Virtru.EncryptParamsBuilder()
      .withStringSource(text)
      .withDisplayFilename(sourceFileName)
      .withPolicy(policy)
      .build();
    let client = new Virtru.Client({
      email: email,
      // acmEndpoint: "https://api.staging.virtru.com/acm",
      // auditEndpoint: "https://audit.staging.virtru.com",
      // easEndpoint: "https://api.staging.virtru.com/accounts",
      // kasEndpoint: "https://api.staging.virtru.com/kas",
      // readerUrl: "https://secure.staging.virtru.com/start?htmlProtocol=1",
      // rcaEndpoint: "https://api.staging.virtru.com/rca",
      // storageEndpoint: "https://api.staging.virtru.com/encrypted-storage",
    });
    client
      .encrypt(encryptParams)
      .then((protectedStream) => {
        let protectedExt = ".tdf.html";
        const protectedFile = sourceFileName + protectedExt;
        protectedStream.toFile(protectedFile).then(() => {
          console.debug(`Encrypted! File - ${protectedFile}`);
        });
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            align="left"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Virtru PWA Demo (SDK: {Virtru.Version})
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack spacing={1} alignItems="center">
        <Collapse in={!isLoggedIn}>
          <Container style={{ margin: 15 }} align="center">
            <TextField
              required
              disabled={sendCodeDisabled}
              id="outlined-required"
              label="Email"
              onChange={(env) => setEmail(env.target.value)}
            />
            <Button
              disabled={sendCodeDisabled}
              style={{ margin: 10 }}
              onClick={sendCode}
            >
              Send Code
            </Button>
          </Container>
          <Container style={{ margin: 15 }} align="center">
            <TextField
              disabled={submitCodeDisabled}
              label="Code from Email"
              InputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                startAdornment: (
                  <InputAdornment position="start">V -</InputAdornment>
                ),
              }}
              onChange={(env) => setCode(env.target.value)}
            />
            <Button
              disabled={submitCodeDisabled}
              style={{ margin: 10 }}
              onClick={submitCode}
            >
              Submit
            </Button>
          </Container>
        </Collapse>
        <Collapse in={isLoggedIn}>
          <Container style={{ margin: 15 }} align="center">
            <TextField
              required
              fullWidth
              multiline
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              rows={4}
              disabled={!isLoggedIn}
              label="Text to encrypt"
              onChange={(env) => setText(env.target.value)}
              style={{ margin: 10 }}
            />
            <TextField
              required
              disabled={!isLoggedIn}
              label="Receiver Email"
              onChange={(env) => setTargetEmail(env.target.value)}
            />
            <Button
              disabled={!isLoggedIn}
              onClick={encryptText}
              style={{ margin: 10 }}
            >
              Encrypt
            </Button>
          </Container>
        </Collapse>
        <Container style={{ margin: 15 }} align="center">
          <Typography
            style={{ marginBottom: 10 }}
            align="center"
            variant="h7"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {isLoggedIn ? `Logged in as ${email}` : "You need to login first"}
          </Typography>
        </Container>
      </Stack>
    </div>
  );
}

export default App;
