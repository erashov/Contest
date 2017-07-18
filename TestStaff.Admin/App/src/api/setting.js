import { requiestToApi } from './engine';

const entityName = 'setting';

export function getSetting(params) {
    return requiestToApi('get', entityName, params);
}
