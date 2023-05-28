
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
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
            <SeatItem data-test="seat" color={selecionado} onClick={() => {
                if (selecionado === "#1AAE9E") {
                    if(props.assentos.length === 1){
                        props.setAssentos([]);
                        selecionarAssentos([])
                    } else {    
                        props.setAssentos([...props.assentos.splice(props.assentos.indexOf(assento))]);
                        selecionarAssentos([...assentosSelecionados.splice(assentosSelecionados.indexOf(id))]);
                    }
                    setSelecionado("#808F9D")
                } else {
                    props.setAssentos([...props.assentos, assento]);
                    selecionarAssentos([...assentosSelecionados, id]);
                    setSelecionado("#1AAE9E")
                }
            }}>{assento}</SeatItem>
        )
    } else {
        return (
            <SeatItem data-test="seat" onClick={() => {
                alert("Esse assento não está disponível")
            }} color={"#FBE192"}>{assento}</SeatItem>
        )
    }

}


export default function SeatsPage({ footerDetails, escolha, setDados, Assentos, SetAssentos }) {
    const [assentos, setAssentos] = useState([])
    const [assentosSelecionados, selecionarAssentos] = useState([])
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const params = useParams()
    const navigate = useNavigate()
    function enviarDados(event) {
        if (assentosSelecionados.length === 0) {
            alert("esqueceu  de selecionar o(s) assento(s) siou !!")
        } else {
            const promise = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
                {
                    ids: assentosSelecionados,
                    name: name,
                    cpf: cpf
                })
            promise.then(() => {
                setDados({ aseentos: assentosSelecionados, nome: name, cpf: cpf, footerDetails: footerDetails, sessao: escolha })
                navigate("/sucesso")
            })
        }
        event.preventDefault()

    }

    function formatarNome(elemento,nome){
       const nomeFormatado = nome.replace(/[0-9]/g, "")
        elemento.value = nomeFormatado
        console.log(nomeFormatado)
        setName(nomeFormatado)
    }

    function formatarcpf(elemnto,cpf){
       const cpfformatado = cpf.replace(/([A-z]{0,11})/g, "") 
        elemnto.value = cpfformatado
        console.log(cpfformatado)
        setCpf(cpfformatado)
    }



    useEffect(() => {
        const promessa = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.idSessao}/seats`)
        promessa.then((assentos) => {
            setAssentos(assentos.data.seats)
        })
    }, [])
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.map((assento) => {
                    return (
                        <Assento assentos={Assentos} setAssentos={SetAssentos} assentosSelecionados={assentosSelecionados} selecionarAssentos={selecionarAssentos} id={assento.id} key={assento.id} avaible={assento.isAvailable} assento={assento.name} />
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

            <FormContainer onSubmit={enviarDados}>
                <label htmlFor="name" >Nome do Comprador:</label>
                <Input data-test="client-name" required onChange={(e) => {
                   formatarNome(e.target,e.target.value)
                }} id="name" name="name" placeholder="Digite seu nome..." />

                <label htmlFor="cpf" >CPF do Comprador:</label>
                <Input data-test="client-cpf"  required type="text" onChange={(e) => {
                    formatarcpf(e.target, e.target.value)
                }} id="cpf" name="cpf" placeholder="Digite seu CPF..." />

                <input data-test="book-seat-btn" id="submit" type="submit" name="submit" />
            </FormContainer>

            <FooterContainer data-test="footer">
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
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    #submit {
        align-self: center;
        background: #E8833A;
        border-radius: 3px;
        width:225px;
        height:42px;
        border:none;
        margin-top:20px;
        color: #FFFFFF;
        font-family: "Roboto";
        font-size:18px;
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


const Input = styled.input`
    border: 1px solid #D5D5D5;
    border-radius:3px;
    width:327px;
    height:51px;
`