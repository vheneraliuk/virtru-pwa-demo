import React from "react";
import { InfoTooltip, Alert, Button, baseTheme } from "virtru-design-system";
import {
  AppBar,
  Toolbar,
  Divider,
  Typography,
  Container,
  Stack,
  ThemeProvider,
} from "@mui/material";

function App() {
  const variants = ["contained", "outlined", "text"];
  const colors = ["primary", "secondary", "success", "error"];
  const severities = ["error", "info", "success", "warning"];

  const [variantIndex, setVariant] = React.useState(0);
  const [colorIndex, setColor] = React.useState(0);
  const [severityIndex, setSeverity] = React.useState(0);

  function variantClick() {
    setVariant(variantIndex === variants.length - 1 ? 0 : variantIndex + 1);
  }

  function colorClick() {
    setColor(colorIndex === colors.length - 1 ? 0 : colorIndex + 1);
  }
  function alertClick() {
    setSeverity(
      severityIndex === severities.length - 1 ? 0 : severityIndex + 1
    );
  }

  return (
    <ThemeProvider theme={baseTheme}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            align="start"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Virtru PWA Demo
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack
        spacing={1}
        alignItems="center"
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <Container style={{ margin: 15 }} align="center">
          <Typography
            align="center"
            variant="h7"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Button variants
          </Typography>
          <Button
            variant={variants[variantIndex]}
            style={{ marginTop: 10 }}
            onClick={variantClick}
          >
            {variants[variantIndex]}
          </Button>
        </Container>
        <Container style={{ margin: 15 }} align="center">
          <Typography
            align="center"
            variant="h7"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Button colors
          </Typography>
          <Button
            color={colors[colorIndex]}
            style={{ marginTop: 10 }}
            onClick={colorClick}
          >
            {colors[colorIndex]}
          </Button>
        </Container>
        <Container style={{ margin: 15 }} align="center">
          <Typography
            align="center"
            variant="h7"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Alert
          </Typography>
          <Alert severity={severities[severityIndex]} style={{ margin: 10 }}>
            This is an alert! Severity is{" "}
            <strong>{severities[severityIndex]}</strong>
          </Alert>
          <Button onClick={alertClick}>Change alert severity</Button>
        </Container>
        <Container style={{ margin: 15 }} align="center">
          <Typography
            style={{ marginBottom: 10 }}
            align="center"
            variant="h7"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Info Tooltip
          </Typography>
          <InfoTooltip title="Virtru PWA" trigger="click" placement="bottom" />
        </Container>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
