import { Typography, Box, CircularProgress } from "@mui/material"
import { useFindImages } from "../hooks/useFindImages"

export const Hand = ({playerHand, handSize}: { playerHand:  string[], handSize: number }) => {
    const [cardImages, cardImagesLoading] = useFindImages(playerHand)

    return cardImagesLoading ? <CircularProgress /> : (
        <>
         <Typography>Hand ({handSize})</Typography>
            <Box display={'flex'} >
            {Object.keys(cardImages).map((cardName,index) => 
            {
              const [url, count] = cardImages[cardName]
                return [...Array(count)].map(_instance => <Box
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
                  </Box>)
                  })
                     }
            </Box>
        </>
       
    )
}