import { requiestToApi } from './engine';

const entityName = 'employeeGroup';

export function getClientGroups(params) {
    return requiestToApi('get', entityName, params);
}

export function addClientGroup(item) {
    return requiestToApi('post', entityName, item);
}

export function editClientGroup(item) {
    return requiestToApi('put', entityName, item);
}

export function removeClientGroup(item) {
    return requiestToApi('delete', entityName, item);
}
