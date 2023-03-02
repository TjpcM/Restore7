import { Divider, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useLocation } from "react-router-dom";

export default function ServerError(){
    const {state} = useLocation();
    console.log(state);
    return (
        <Container component= {Paper}>
            {state?.error ? (
                <>
                  <Typography gutterBottom variant='h3' color='secondary'>
                    {state.error.title}
                  </Typography>
                  <Divider />
                  <Typography variant='body1' >{state.error.detail || 'Internal sever error'}</Typography>
                </>
            ): (<Typography gutterBottom variant='h5'>Server error</Typography>)}
            
        </Container>
    )
}