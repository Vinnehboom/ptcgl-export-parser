import { Typography, Grid } from "@mui/material"
import { useState } from "react"


export const Prizes = ({prizeCount}: {prizeCount: number}) => {
    return(
        <>
        <Typography>Prizes ({prizeCount})</Typography>
            <Grid container gridRow={3}>
              {[...Array(prizeCount).keys()].map((card) => (
                <Grid key={card} item>
                  <img
                    className="pokemonCardBack"
                    alt="pokemon-cardback"
                    src="./img/pokecardback.png"
                  />
                </Grid>
              ))}
            </Grid>
            </>
    )
}