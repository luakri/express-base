/*jshint curly: true, eqeqeq: true, immed: true, indent: 4, browser: true, jquery: true, evil: true, regexdash: true, node: true, trailing: true, sub: true, unused: true, devel: true, white: true */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    requestjson = require('./routes/requestjson'),
    http = require('http'),
    path = require('path'),

    app = express(),

    Createserver = (function ()
    {
        'use strict';

        function Createserver(options)
        {
            this.options = options;

            this.init.apply(this);
        }

        Createserver.prototype =
        {
            defaults:
            {

            },

            setOptions : function ()
            {
                app.set('port', process.env.PORT || 3000);

                app.set('views', __dirname + '/views');

                app.set('view engine', 'jade');

                app.use(express.favicon());

                app.use(express.logger('dev'));

                app.use(express.bodyParser());

                app.use(express.methodOverride());

                app.use(app.router);

                app.use(express.static(path.join(__dirname, 'public')));

                // development only
                if ('development' === app.get('env'))
                {
                    app.use(express.errorHandler());
                }
            },

            setRoutes : function ()
            {
                app.get('/', routes.index);

                app.get('/users', user.list);

                app.get('/request-json', requestjson.requestjson);
            },

            createServer : function ()
            {
                http
                .createServer(app)
                .listen(app.get('port'), function ()
                {
                    console.log('Express server listening on port ' + app.get('port'));
                });
            },

            init: function ()
            {
                this.setOptions();

                this.setRoutes();

                this.createServer();

                return this;
            }
        };

        Createserver.settings = Createserver.prototype.settings;

        return Createserver;

    })();

var createserver = new Createserver();
