'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    Product = require('./Product.jsx'),
    sampleActions = require('../actions/sample'),

Html = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        {listenStores: ['page']}
    ],

    shouldComponentUpdate: function () {
        return true; //false;
    },

    getStateFromStores: function () {
        return {};
    },

    handleClickLink: function (E) {
        var HREF = E.target.href,
            self = this,
            initState;

        if (!HREF || HREF.match(/#/)) {
            return;
        }

        E.preventDefault();
        E.stopPropagation();

        // Store original state 1 time. And, setup history event listener
        if (!initState) {
            initState = this._getContext().toString();
            /*global window*/
            window.addEventListener('popstate', function (E) {
                var state = E.state || initState;
                if (!state) {
                    return console.log('NO STATE DATA....can not handle re-rendering');
                }
                // Ya, trigger page restore
                self.executeAction(function () {
                    var I;

                    this._context = JSON.parse(state);
                    for (I in this._stores) {
                        if (this._stores.hasOwnProperty(I)) {
                            this._stores[I]._context = this._context.stores[I];
                        }
                    }

                    this.dispatch('UPDATE_TITLE');
                    this.getStore('productStore').emitChange();
                    return this.resolvePromise(true);
                });
            });
        }

        // Go to the url
        this._getContext().dispatch('UPDATE_URL', HREF).then(function () {
            // Run action to update page stores
            return this.executeAction(sampleActions.updateProductPage);
        }).then(function () {
            // Success, update url to history
            /*global history*/
            history.pushState(self._getContext().toString(), undefined, HREF);
        });
    },

    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.getStore('page').get('title')}</title>
         </head>
         <body onClick={this.handleClickLink}>
          <Product />
         </body>
         <script src="/static/js/main.js"></script>
         <script dangerouslySetInnerHTML={{__html: this._getInitScript()}}></script>
<script>
</script>
        </html> 
        );
    }
});

module.exports = Html;