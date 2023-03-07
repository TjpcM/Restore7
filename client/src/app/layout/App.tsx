import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useStoreContext } from "../api/context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

//class vs functional component
function App() {
  const {setBasket} = useStoreContext();  // costumer hook to consume context
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const buyerId =  getCookie('buyerId');
    if (buyerId){
      agent.Basket.get()
          .then(basket => setBasket(basket))
          .catch(error => console.log(error))
          .finally(() => setLoading(false));
    }else{
      setLoading(false);
    }
  },[setBasket])

  const [darkMode, setDarkMode]  = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette:{
      mode:palleteType,
      background:{
        default :palleteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange(){
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initialising  app..." />

   return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header darkMode={darkMode}  handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
