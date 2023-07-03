import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36533445-a1e23ac088572808c637a5064';

const fetchPixabay = async (query, page) => {
    const response = await axios.get(`${BASE_URL}?&page=${page}&q=${query}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data.hits;
    }
    

export default fetchPixabay;