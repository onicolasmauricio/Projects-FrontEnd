import { useEffect, useState } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'

function Favoritos(){

const [movies, setMovies] = useState([])

useEffect(()=>{
    const myList = localStorage.getItem("@primeflix");
    setMovies(JSON.parse(myList) || [])

}, [])

return(
    <div className='my-movies'>
        <h1>Meus filmes</h1>

        <ul>
            {movies.map((item) => { 
                return(
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <div>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button>Excluir</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    </div>
)
}

export default Favoritos;