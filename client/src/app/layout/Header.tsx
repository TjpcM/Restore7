import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
//sx allows to define css properties, mb - margin bottom

interface Props{
    darkMode: boolean;
    handleThemeChange: () => void;
}
export default function Header({darkMode,  handleThemeChange}:Props){
    return(
       <AppBar position='static' sx={{mb:4}}>
        <Toolbar>
        <Switch  checked ={darkMode} onChange={handleThemeChange}/>
            <Typography variant='h6'>
                RE-STORE
            </Typography>
        </Toolbar>
       </AppBar> 
    )
}