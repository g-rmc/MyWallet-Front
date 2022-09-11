import axios from 'axios';

const baseURL = 'http://localhost:5000';

function postLogin (login){
    const promise = axios.post(`${baseURL}/auth/sign-in`, login);
    return promise;
}

function postNewUser (newUser){
    const promise = axios.post(`${baseURL}/auth/sign-up`, newUser);
    return promise;
}

function getRegister (config){
    const promise = axios.get(`${baseURL}/register`, config);
    return promise;
}

export { postLogin, postNewUser, getRegister }