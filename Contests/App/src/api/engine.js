import appConfig from '../../appConfig.js';

export function requiestToApi(method, apiPath, params) {
    let url = appConfig.serverUrl + 'api/' + apiPath;
    let opts = {
        method: method,
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    if (method === 'get') {
        url += '?' + paramsToGet(params);
    } else {
        opts.body = toJson(params);
    }

    return fetch(url, opts)
        .then(process)
        .then(res => res.json());
}

function paramsToGet(params) {
    return Object.keys(params)
        .filter(key => {
            switch (typeof params[key]) {
                case 'string':
                case 'number':
                case 'boolean':
                    return true;
                default:
                    return false;
            }
        })
        .map(key => key + '=' + encodeURIComponent(params[key]))
        .join('&');
}

function toJson(body) {
    try {
        return JSON.stringify(body);
    } catch (e) {
        return null;
    }
}

function process(res) {
    if (!res.ok) {
        console.log(res);
        throw new Error(res);
    }
    return res;
}
