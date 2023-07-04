import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36533445-a1e23ac088572808c637a5064';

const fetchPixabay = async (query, page) => {
    const {data} = await axios.get(`${BASE_URL}?&q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return data;
    }
    

export default fetchPixabay;