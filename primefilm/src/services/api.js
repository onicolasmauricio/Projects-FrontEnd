import axios from "axios";  

// Base da URL: https://api.themoviedb.org/3/
// URL  da API: https://api.themoviedb.org/3/movie/now_playing?api_key=5f5ee116a732f1dabd8b46a9e2be297e&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;