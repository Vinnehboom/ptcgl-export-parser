import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./Routes";
import { ReplayContext, replayContextType } from "./contexts/ReplayContext";
import { useState } from "react";
import "./App.css";

function App() {
  const [ptcgImport, setPtcgImport] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");

  const defaultReplayContextValue: replayContextType = {
    ptcgImport: ptcgImport,
    playerName: playerName,
    setPtcgImport: setPtcgImport,
    setPlayerName: setPlayerName,
  };

  return (
    <ReplayContext.Provider value={defaultReplayContextValue}>
      <Router>
        <Routes />
      </Router>
    </ReplayContext.Provider>
  );
}

export default App;
