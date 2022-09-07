import axios from 'axios';

const baseURL = 'localhost:5000';

function postAccess (login){
    const promise = axios.post(`${baseURL}/login`);
    return promise;
}

export { postAccess }