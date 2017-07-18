import { requiestToApi } from './engine';

const entityName = 'answer';

export function getAnswers(params) {
    return requiestToApi('get', entityName, params);
}

export function addAnswer(item) {
    return requiestToApi('post', entityName, item);
}

export function editAnswer(item) {
    return requiestToApi('put', entityName, item);
}

export function removeAnswer(item) {
    return requiestToApi('delete', entityName, item);
}

export function getAnswerType(params) {
    return requiestToApi('get', entityName, params);
}
