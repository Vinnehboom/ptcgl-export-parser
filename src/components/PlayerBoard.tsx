export type PlayerBoardType = {
  playerName: string;
  deckCount: number;
  playerHand: string[];
  discardCount: number;
  benchedCards: string[];
  handSize: number,
  prizeCount: number;
  activePokemon: string;
  player?: boolean
};
import { Typography, Box, Grid } from "@mui/material";
import { Bench } from "./Bench";
import { Active } from "./Active";
import { Prizes } from "./Prizes";
import { useState } from "react";
import { Hand } from "./Hand";


export const PlayerBoard = ({
  playerName,
  deckCount,
  playerHand,
  discardCount,
  benchedCards,
  prizeCount,
  activePokemon,
  handSize,
  player,
}: PlayerBoardType) => {
    const [name, _setPlayerName] = useState<string>(playerName)
    const [deck, _setDeck] = useState<number>(deckCount)
    const [discard, _setDiscard] = useState<number>(discardCount)
    const [prizes, _setPrizes] = useState<number>(prizeCount)

  return (
    <Box display={'flex'} flexDirection={ player ? 'column-reverse' : 'column'}
    >
      <Typography variant="h5" textAlign="center">
        {name}
      </Typography>
      <Box>
        <Grid container style={{ direction: player ? "rtl" : "ltr" }}>
          <Grid
            item
            sm={2}
            display={"flex"}
            flexDirection="column"
            alignItems={"center"}
          >
            <Box>
            <Typography>Deck ({deckCount})</Typography>
            <img
              className="pokemonCardBack"
              alt="pokemon-cardback"
              src="./img/pokecardback.png"
            />
            </Box>
            <Box>
            <Typography>Discard ({discardCount})</Typography>
            </Box>
          </Grid>
          <Grid
            item
            sm={8}
            display={'flex'} flexDirection={ player ? 'column-reverse' : 'column'}
          >
            <Hand  playerHand={playerHand} handSize={handSize} />
            <Box display={'flex'} flexDirection={ player ? 'column-reverse' : 'column'}>
            <Bench cardNames={benchedCards} />
            <Box marginTop={4}>
              <Active cardName={activePokemon} />
            </Box>
            </Box>
          </Grid>
          <Grid item sm={2}>
            <Prizes prizeCount={prizes}/>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
