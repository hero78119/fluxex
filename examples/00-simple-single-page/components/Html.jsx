'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    InitScript = Fluxex.InitScript,
    Product = require('./Product.jsx'),
    Sample = require('./Sample.jsx'),

Html = React.createClass({
    mixins: [Fluxex.mixin],

    shouldComponentUpdate: function () {
        return false;
    },

    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.getStore('page')._get('title')}</title>
         </head>
         <body>
          <div>Test...OK??.</div>
          <Product />
          <Sample />
          <InitScript />
         </body>
        </html> 
        );
    }
});

module.exports = Html;
