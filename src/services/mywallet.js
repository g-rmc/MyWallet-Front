import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

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

function postNewRegister(newRegister, config){
    const promise = axios.post(`${baseURL}/register`, newRegister, config);
    return promise;
}

function deleteRegister(id, config){
    const promise = axios.delete(`${baseURL}/register/${id}`, config);
    return promise;
}

function getRegisterById(id, config){
    const promise = axios.get(`${baseURL}/register/${id}`, config);
    return promise;
}

function editRegisterById(id, editedRegister, config){
    const promise = axios.put(`${baseURL}/register/${id}`, editedRegister, config);
    return promise;
}

export { postLogin, postNewUser, getRegister, postNewRegister, deleteRegister, getRegisterById, editRegisterById }