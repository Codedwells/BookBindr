import axios from 'axios';
import { toast } from 'sonner';

const api = axios.create({
  baseURL: 'http://localhost:6969',
});

export const getBookMatches = async ({genre,hobby}: {genre: string, hobby: string}) => {
    try {
        const { data } = await api.get(`/recommend?genre=${genre}&hobby=${hobby}`);
        return data;
    }catch(err:any) {
        toast.error("Error while fetching book matches")
    }
}
