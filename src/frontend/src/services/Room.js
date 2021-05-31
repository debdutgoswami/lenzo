import { apiUrl } from '../config';
import axios_instance from "./axios";

const endpoint = apiUrl + '/room/create'

export function create(room) {
    return axios_instance.post(endpoint, {
        name: room.roomName,
    })
}
