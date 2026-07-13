/* eslint-disable */
import { createContext } from "react";
import { Approutes } from "./routes/Approutes";

export const ColorModeContext = createContext<{ mode: string }>({ mode: "light" });

function App() {
  return (
    <ColorModeContext.Provider value={{ mode: "light" }}>
      <div>
        <Approutes />
      </div>
    </ColorModeContext.Provider>
  );
}

export default App;