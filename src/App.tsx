/* eslint-disable */
import { createContext, useState, useMemo } from "react";
import { Approutes } from "./routes/Approutes";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ColorModeContext = createContext<{ 
  mode: "light" | "dark"; 
  toggleMode: () => void 
}>({ 
  mode: "light", 
  toggleMode: () => {} 
});

function App() {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("appMode");
    return (saved === "dark" || saved === "light") ? saved : "light";
  });

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("appMode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Approutes />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;