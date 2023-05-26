
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"


function Assento(props) {
    const assento = props.assento
    const isAvaible = props.avaible
    const id = props.id
    const assentosSelecionados = props.assentosSelecionados
    const selecionarAssentos = props.selecionarAssentos
    const [selecionado, setSelecionado] = useState("#808F9D")
    if (isAvaible) {
        return (
            <SeatItem color={selecionado} onClick={() => { selecionarAssentos([...assentosSelecionados, id]); setSelecionado("#1AAE9E") }}>{assento}</SeatItem>
        )
    } else {
        return (
            <SeatItem color={"#FBE192"}>{assento}</SeatItem>
        )
    }

}


export default function SeatsPage({footerDetails,escolha }) {
    const [assentos, setAssentos] = useState([])
    const [assentosSelecionados, selecionarAssentos] = useState([])
    const params = useParams()
    useEffect(() => {
        const promessa = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`)
        promessa.then((assentos) => {
        setAssentos(assentos.data.seats)
        })
    }, [])
    console.log(footerDetails)
    console.log(escolha)
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.map((assento) => {
                    return (
                        <Assento assentosSelecionados={assentosSelecionados} selecionarAssentos={selecionarAssentos} id={assento.id} key={assento.id} avaible={assento.isAvailable} assento={assento.name} />
                    )
                })}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle color={"#1AAE9E"} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color={"#C3CFD9"} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color={"#FBE192"} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <label htmlFor="name" >Nome do Comprador:</label>
                <Input id="name" name="name"  placeholder="Digite seu nome..." />

                <label htmlFor="cpf" >CPF do Comprador:</label>
                <Input id="cpf" name="cpf" placeholder="Digite seu CPF..." />

                <Button>Reservar Assento(s)</Button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={footerDetails.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{footerDetails.title}</p>
                    <p>{escolha.dia + " - " + escolha.horario}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )

}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.form`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.color};      
    background-color: ${props => props.color};    
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${(props) => props.color};      
    background-color: ${(props) => props.color};    
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
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
`
const Button = styled.button`
    background: #E8833A;
    border-radius: 3px;
    width:225px;
    height:42px;
    border:none;
    margin-top:20px;
    color: #FFFFFF;
    font-family: "Roboto";
    font-size:18px;
`

const Input = styled.input`
    border: 1px solid #D5D5D5;
    border-radius:3px;
    width:327px;
    height:51px;
`