import { Typography, Box, Grid, Button, CircularProgress} from "@mui/material";
import { ReplayContext } from "../contexts/ReplayContext";
import { useContext, useEffect, useState, useRef } from "react";
import { PlayerBoard } from "../components/PlayerBoard";
import { TextLog } from '../components/TextLog'
import { useNavigate } from "react-router-dom";
import { cleanLog, parseSetup, parseSetupReturnType } from '../helpers/logParser'

export const Replay = () => {
  const { ptcgImport, playerName } = useContext(ReplayContext);
  const [log, setLog] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [opponentName, setOpponentName] = useState<string>('Jeff')
  const [opponentHandSize, setOpponentHandSize] = useState<number>(7);
  const [opponentDeckCount, setOpponentDeckCount] = useState<number>(60);
  const [opponentDiscardCount, setOpponentDiscardCount] = useState<number>(0);
  const [opponentHand, setOpponentHand] = useState<string[]>([])
  const [opponentPrizeCount, setOpponentPrizeCount] = useState<number>(6);
  const [opponentBench, setOpponentBench] = useState<string[]>([
    "Iron Hands ex",
  ]);
  const [opponentActive, setOpponentActive] = useState<string>("");
  const [playerHand, setPlayerHand] = useState<string[]>([]);
  const [playerDeckCount, setPlayerDeckCount] = useState<number>(60);
  const [playerDiscardCount, setPlayerDiscardCount] = useState<number>(0);
  const [playerPrizeCount, setPlayerPrizeCount] = useState<number>(6);
  const [playerBench, setPlayerBench] = useState<string[]>([]);
  const [playerHandSize, setPlayerHandSize] = useState<number>(7);
  const [playerActive, setPlayerActive] = useState<string>("");
  const [lineNumber, setLineNumber] = useState<number>(0);

  const navigate = useNavigate()

  useEffect(() => {
    if(Number(ptcgImport?.length) < 1) {
        navigate('/')
    } else {
        setLoading(true)
        const log = cleanLog(ptcgImport!);
        const { playerActive, playerBench, playerHand, opponentActive, opponentBench, opponentHand, opponentHandSize, playerHandSize, firstPlayer }: parseSetupReturnType = parseSetup(log, playerName!);
        setPlayerActive(playerActive)
        setPlayerBench(playerBench)
        setPlayerHand(playerHand as string[])
        setOpponentActive(opponentActive)
        setOpponentBench(opponentBench)
        setOpponentHandSize(opponentHandSize)
        setOpponentHand(opponentHand)
        setPlayerHandSize(playerHandSize)
        setLog(log)
        setLoading(false)
    }
  }, [navigate, ptcgImport])

  return loading ? <CircularProgress /> : (
    <Box minWidth={"100%"} height={'100vh'}>
      <Grid container>
        <Grid item xs={9}>
        <PlayerBoard
        discardCount={opponentDiscardCount}
        playerName={opponentName}
        activePokemon={opponentActive}
        benchedCards={opponentBench}
        deckCount={opponentDeckCount}
        playerHand={opponentHand}
        handSize={opponentHandSize}
        prizeCount={opponentPrizeCount}
      />
      <PlayerBoard
        player={true}
        discardCount={playerDiscardCount}
        playerName={playerName!}
        activePokemon={playerActive}
        benchedCards={playerBench}
        deckCount={playerDeckCount}
        playerHand={playerHand}
        handSize={playerHandSize}
        prizeCount={playerPrizeCount}
        />
            </Grid>
        <Grid minHeight={'100vh'} maxHeight={'100vh'} item xs={3}>
            <Box marginBottom={4} display={'flex'} justifyContent={'space-evenly'}>
                <Button variant="contained"><Typography>Previous action</Typography></Button>
                <Button variant="contained"><Typography>Next action</Typography></Button>

            </Box>
            <TextLog log={ptcgImport!} />
        </Grid>
      </Grid>
    </Box>
  );
};
