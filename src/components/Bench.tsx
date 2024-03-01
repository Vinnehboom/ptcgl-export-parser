import { Box, Typography } from "@mui/material";
import { useFindImages } from "../hooks/useFindImages";

export const Bench = ({
  cardNames
}: {
  cardNames: string[];
}) => {
  const [benchImages, benchImagesLoading] = useFindImages(cardNames);

  return benchImagesLoading ? (
    <></>
  ) : (
    <Box paddingY={2}>
      <Box display={"flex"} minHeight={'6rem'} justifyContent={"space-evenly"}>
        {" "}
        {Object.keys(benchImages).map((cardName,index) => 
          {
            const [url, _count] = benchImages[cardName]
            
            return(
              <Box
              key={cardName+index}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <img
                className="pokemonCardBack"
                alt="pokemon-cardback"
                src={url}
              />
              <Typography>{cardName}</Typography>
            </Box>   
            )
          }
        )}{" "}
      </Box>
    </Box>
  );
};
