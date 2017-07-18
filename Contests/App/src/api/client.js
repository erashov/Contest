import { requiestToApi } from './engine';

const entityName = 'client';

export function getClients(params) {
    return requiestToApi('get', entityName, params);
}

export function addClient(item) {
    return requiestToApi('post', entityName, item);
}

export function editClient(item) {
    return requiestToApi('put', entityName, item);
}

export function removeClient(item) {
    return requiestToApi('delete', entityName, item);
}
