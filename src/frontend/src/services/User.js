import axios from 'axios';
import { apiUrl } from '../config';

const endpoint = apiUrl + '/user/create'

export function register(user) {
    return axios.post(endpoint, {
        email: user.email,
        username: user.username,
        password: user.password,
        // name: user.name
    })
}