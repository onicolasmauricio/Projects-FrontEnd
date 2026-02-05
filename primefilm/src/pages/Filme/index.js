import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from '../../services/api';
import './filme-info.css';
import { toast } from "react-toastify";

function Filme(){
    const { id } = useParams();
    const navigation = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){ 
            await api.get(`/movie/${id}`, {
                params:{ 
                api_key: "5f5ee116a732f1dabd8b46a9e2be297e",
                language: "pt-BR",  
                }
            })
            .then((response)=>{ 
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado!");
                navigation("/", {replace: true});
                return;
            })
        }

        loadFilme();
        
        return() => {
            console.log("Componente desmontado")
        }
    }, [navigation, id])

    function SaveFilm(){
        const myList = localStorage.getItem("@primeflix");
        
        let movieSaved = JSON.parse(myList) || [];

        const hasFilm = movieSaved.some( (movieSaved) => movieSaved.id === filme.id)
        
        if(hasFilm){ 
            toast.warn("Filme já adicionado a lista")
            return;
        }

        movieSaved.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(movieSaved));
        toast.success("Filme salvo com sucesso!")
    }


    if(loading){
        return( 
        <div className="filme-info">
            <h1>Carregando detalhes do filme...</h1>
        </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

        <h3>Sinopse</h3>
        <span>{filme.overview}</span>

        <strong>Avaliação: {filme.vote_average} /10</strong>

        <div className="area-buttons">
            <button onClick={SaveFilm}>Salvar</button>
            <button>
                <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
            </button>
        </div>


        </div>
    )
}

export default Filme;