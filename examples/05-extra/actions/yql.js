'use strict';

var fetch = require('fluxex/extra/fetch');

module.exports = function (yql) {
    if (!yql) {
        throw new Error('call yql without yql statement!');
    }

    return fetch('yql', {
        qs: {
            q: yql,
            format: 'json',
            env: 'store://datatables.org/alltableswithkeys'
        },
        rejectUnauthorized : false,
        json: true
    }).then(function (O) {
        if (O.body && O.body.query && O.body.query.hasOwnProperty('results')) {
            return O.body.query.results;
        } else {
            throw new Error({
                message: 'no query.results in response',
                request: O
            });
        }
    });
};
