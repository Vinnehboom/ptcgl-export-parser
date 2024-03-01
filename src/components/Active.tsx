import { useEffect, useState } from "react";
import { useFindImages } from "../hooks/useFindImages";
import { Box, Typography } from "@mui/material";

export const Active = ({ cardName }: { cardName: string }) => {
  const [cardImageHash, cardImageHashLoading] = useFindImages([cardName]);
  const [cardImageSrc, setCardImageSrc] = useState<string>('')

  useEffect(() => {
    if(cardImageHash[cardName]){
      setCardImageSrc(cardImageHash[cardName][0])
    }
  } , [])

  return cardImageHashLoading ? (
    <></>
  ) : (
    <Box display={"flex"} flexDirection={"column"} justifyContent={"center"}>
      <img
        className="pokemonCardBack"
        alt="pokemon-cardback"
        src={cardImageSrc}
      />
      <Typography textAlign={"center"}>{cardName}</Typography>
    </Box>
  );
};
