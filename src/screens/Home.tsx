import {
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { ReplayContext } from "../contexts/ReplayContext";
import { parse } from "path";

export const Home = () => {
  const [ptcgExport, setPtcgExport] = useState<File>();
  const [player, setPlayer] = useState<string>();
  const navigate = useNavigate();
  const { ptcgImport, setPtcgImport, setPlayerName } =
    useContext(ReplayContext);

  const handleSubmit = (e: React.FormEvent) => {
    if (ptcgExport && ptcgImport && player) {
      setPlayerName(player);
      navigate("/replay");
    } else {
      console.log("no import");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setPtcgImport(reader.result as string);
    };
    setPtcgExport(file);
    console.log(ptcgImport);
  };

  return (
    <Box display={'flex'} minHeight={'100%'} minWidth={'100%'} alignItems={'center'} flexDirection={'column'}>
              <Typography marginY={5} variant="h2">PTCGL Replay</Typography>

        <Box padding={5} border={1} borderRadius={5}>
        <form onSubmit={handleSubmit}>
            <Box display={'flex'} flexDirection={'column'}>
        <FormControl margin={'normal'}>
          <TextField
            onChange={(e) => {
              setPlayer(e.target.value);
            }}
            label="Player nickname"
            id={"player_name"}
            name={"player_name"}
            required={true}
          />
        </FormControl>
        <FormControl margin={'normal'}>
          <InputLabel htmlFor="ptcgl_export">
            Upload PTCGL Log export
          </InputLabel>
          <input
            onChange={handleFileChange}
            type={"file"}
            
            id={"ptcgl_export"}
            name={"ptcgl_export"}
            required={true}
          />
        </FormControl>
        <Box marginTop={4} display={'flex'} justifyContent={'center'}>
            <Button type="submit">View replay</Button>
        </Box>
            </Box>

      </form>
        </Box>      
    </Box>
  );
};
