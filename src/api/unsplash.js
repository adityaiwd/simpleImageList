import axios from 'axios';

export default axios.create({
    baseURL:'https://api.unsplash.com',
    headers:{
        Authorization: 'Client-ID ihvCaj-gJUCix4izKfOoui7KZ7D9NxSNmKj5bpIzh0Q'  
    }
});