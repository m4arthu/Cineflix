import { Link } from "react-router-dom"
import styled from "styled-components"

function Movie({ filmeSrc,filmeId }) {
    return (
        <Link to={`/sessoes/${filmeId}`}>
            <MovieContainer>
                <img src={filmeSrc} alt="poster" />
            </MovieContainer>
        </Link>
    )
}

export default function HomePage({ filmes }) {
    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {filmes.map((filme) => {
                    return (
                        <Movie key={filme.id} filmeSrc={filme.posterURL} filmeId={filme.id} />
                    )
                })}
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`