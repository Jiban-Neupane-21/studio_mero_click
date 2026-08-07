/* eslint-disable */
import { createContext, useState, useMemo } from "react";
import { Approutes } from "./routes/Approutes";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DataProvider } from "./context/DataContext";
import DataPreloader from "./components/common/DataPreloader";

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
    <DataProvider>
      <DataPreloader>
        <ColorModeContext.Provider value={{ mode, toggleMode }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
              <Approutes />
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </DataPreloader>
    </DataProvider>
  );
}

export default App;