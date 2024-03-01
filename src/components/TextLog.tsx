import { Paper, Box, Typography } from "@mui/material"

export const TextLog = ({log}: {log: string}) => {
    return(
        <Paper style={{maxHeight: '100%', overflow: 'scroll'}}>
                        {log.split('\n').map((line, index) => <Box key={`line-${index}`}><Typography>{line}</Typography></Box>)}
        </Paper>
    )
}