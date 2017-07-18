import { requiestToApi } from './engine';

const entityName = 'question';

export function getQuestions(params) {
    return requiestToApi('get', entityName, params);
}

export function addQuestion(item) {
    return requiestToApi('post', entityName, item);
}

export function editQuestion(item) {
    return requiestToApi('put', entityName, item);
}

export function removeQuestion(item) {
    return requiestToApi('delete', entityName, item);
}

export function getQuestionType(params) {
    return requiestToApi('get', entityName, params);
}
