import styled from "styled-components"
import { Link } from "react-router-dom"
import moment from "moment/moment"


function Assento({ assento }) {
    return (
        <p>Assento {assento}</p>
    )
}

export default function SuccessPage({ dados, assentos }) {
   let  data = moment(dados.footerDetails.releaseDate).utc().format('MM/DD/YYYY')
   let time = new Date(data).toLocaleTimeString()
    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessão</p></strong>
                <p>{dados.footerDetails.title}</p>
                <p>{data + "   " + time}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {assentos.map((assento) => {
                    return (
                        <Assento key={assentos.indexOf(assento)} assento={assento}></Assento>
                    )
                })}
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>{dados.nome}</p>
                <p>{dados.cpf}</p>
            </TextContainer>

            <Link to={"/"}><Button>Voltar para Home</Button></Link>
        </PageContainer>
    )
}


const Button = styled.button`

font-family: 'Roboto';
font-weight: 400;
font-size: 18px;
align-items: center;
text-align: center;
width: 225px;
height: 42px;
background: #E8833A;
border-radius: 3px;
border:none;
color:white;
`

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    strong {
        font-weight: bold;
        margin-bottom: 10px;
    }
`