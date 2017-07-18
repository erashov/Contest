import { requiestToApi } from './engine';

const entityName = 'test';

export function getContests(params) {
    return requiestToApi('get', entityName, params);
}

export function addContest(item) {
    return requiestToApi('post', entityName, item);
}

export function editContest(item) {
    return requiestToApi('put', entityName, item);
}

export function removeContest(item) {
    return requiestToApi('delete', entityName, item);
}
