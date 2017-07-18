
let url = '';

switch (process.env.NODE_ENV) {
    case 'production':
        url = 'http://serv-iis/teststaffadmin/';      
        break;
    case 'dev':
        url = 'http://serv-dev/teststaffadmin/';
        break;
    default:
        url = 'http://localhost:15979/';
}

module.exports = {
    serverUrl: url,
    page: 1,
    count: 1000,
    testUser: 'TestUser@akado.com'
};
