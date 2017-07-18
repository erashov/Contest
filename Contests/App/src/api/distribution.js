import { requiestToApi } from './engine';

const entityName = 'distribution';

export function getDistributions(params) {
    return requiestToApi('get', entityName, params);
}

export function addDistribution(item) {
    return requiestToApi('post', entityName, item);
}

export function editDistribution(item) {
    return requiestToApi('put', entityName, item);
}

export function removeDistribution(item) {
    return requiestToApi('delete', entityName, item);
}
