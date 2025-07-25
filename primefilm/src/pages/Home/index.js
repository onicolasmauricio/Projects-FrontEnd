import { useEffect, useState } from "react";
import api from "../../services/api";

// URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=5f5ee116a732f1dabd8b46a9e2be297e&language=pt-BR

function Home(){
    const[filmes, setFilmes] = useState([]);

    useEffect(()=>{
        async function loadFilmes() {
        const response = await api.get("movie/now_playing", {
            params:{
                api_key: "5f5ee116a732f1dabd8b46a9e2be297e",
                language: "pt-BR",
                page: 1, 
            }
        })
            console.log(response.data.results)
        }

        loadFilmes(); 
    }, [])

    return(
        <div>
            <h1>Bem-vindo a página Home</h1>
        </div>
    )
}

export default Home;