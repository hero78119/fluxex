/* Deprecated */
/* Please use rpc for better interface and logic */
'use strict';

module.exports = {
    getRequestConfig: function (name, cfg, mainCfg, baseURL) {
        return Object.assign({}, cfg, {
            method: 'PUT',
            body: JSON.stringify(cfg),
            url: baseURL + name,
            json: (cfg && cfg.json) ? true : false,
            headers: {
                'content-type': 'application/json'
            }
        });
    }
};
