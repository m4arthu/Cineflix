import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"


function Times({ time,FooterDetails,setFooterDetails }) {
    return (
        <button>{time}</button>
    )
}
function Session({ dataDia,setEscolha }) {
    return (
        <SessionContainer>
            {dataDia.weekday} - {dataDia.date}
            <ButtonsContainer>
                {dataDia.showtimes.map((time) => {
                    return (
                        <Link onClick={()=>{setEscolha({dia:dataDia.weekday,horario:time.name})}} key={time.id}  to={`/assentos/${time.id}`}>
                            <Times  time={time.name} />
                        </Link>
                    )
                })}
            </ButtonsContainer>
        </SessionContainer>

    )
}

export default function SessionsPage({footerDetails, setfooterDetails, setEscolha}) {
    const params = useParams()
    const [Filme, setFilme] = useState([])
    
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${params.idFilme}/showtimes`)
        promise.then((resposta) => {
            setFilme(resposta.data.days)
            setfooterDetails(resposta.data)
        })
    }, [])


   
        return (
            <PageContainer>
                Selecione o horário
                <div>
                    {Filme.map((dia) => {
                        return (
                            <Session setEscolha={setEscolha}   key={dia.id} dataDia={dia} />
                        )
                    })}
                </div>

                <FooterContainer>
                    <div>
                        <img src={footerDetails.posterURL} alt="poster" />
                    </div>
                    <div>
                        <p>{footerDetails.title}</p>
                    </div>
                </FooterContainer>

            </PageContainer>
        )

   
    }


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        border-radius:3px;
        width:83px;
        height:43px;
        border:none;
        background:#E8833A;
        color: white;
        font-size:18px;
        font-family: "Roboto";
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
    p{  
        max-width: 200px ;
        overflow: hidden; // Removendo barra de rolagem
        text-overflow: ellipsis; // Adicionando "..." ao final
        display: -webkit-box;
       -webkit-line-clamp: 4; // Quantidade de linhas
       -webkit-box-orient: vertical
    }
`