import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import { useState,useEffect } from "react"
import axios from "axios"

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'fiOPbqtwKv2g3xIYDfnGiDIn';
    const [filmes,setFilmes] = useState([])
    const [FooterDetails, setFooterDetails] = useState({})
    useEffect(()=>{
      const promise =  axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies") 
      promise.then((resposta)=>{
      setFilmes(resposta.data)
      })
    }, [])
    if(filmes.length === 0){
        return(
            <div>
                carregendo....espera ae manooo
            </div>
        )
    } else {
        return (
            <BrowserRouter>
                <NavContainer>CINEFLEX</NavContainer>
                <Routes>
                    <Route path="/"  element={<HomePage filmes={filmes}/>}></Route>
                    <Route path="/sessoes/:idFilme" element={<SessionsPage FooterDetails={FooterDetails}  setFooterDetails={setFooterDetails}/>}></Route>
                    <Route path="/assentos/:idSessao" element={<SeatsPage FooterDetails={FooterDetails} />}></Route>
                    <Route path="/sucesso" element={<SuccessPage/>}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
