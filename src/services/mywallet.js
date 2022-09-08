import axios from 'axios';

const baseURL = 'http://localhost:5000';

function postLogin (login){
    const promise = axios.post(`${baseURL}/login`);
    return promise;
}

function postRegister (register){
    const promise = axios.post(`${baseURL}/register`);
    return promise;
}

export { postLogin, postRegister }