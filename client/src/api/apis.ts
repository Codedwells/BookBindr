import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6969',
});

export const getBookMatches = async ({genre,hobby}: {genre: string, hobby: string}) => {
    try {
        const { data } = await api.get(`/bookMatches?genre=${genre}&hobby=${hobby}`);
        return data;
    }catch(err) {
        console.log(err);
    }
}
