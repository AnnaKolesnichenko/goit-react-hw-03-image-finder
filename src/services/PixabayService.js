class PixabayService {
    BASE_URL = 'https://pixabay.com/api/';
    API_KEY = '36533445-a1e23ac088572808c637a5064';

    fetchPixabay(query, page = 1) {
        return fetch(`${this.BASE_URL}?q=${query}&page=1&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.status);
    })
}

    // getResults = async (query) => {
    //     let res = await fetch(query);
    //     if(!res.ok) {
    //         throw new Error(`There is no ${query} query, status: ${res.status}`);
    //     }
    //     return res.json();
    // }

    // getQueryPictures = async() => {
    //     return await this.getResults(`${this.BASE_URL}?q=cat&page=1&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    // }
}



export default PixabayService;