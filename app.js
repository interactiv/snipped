/*jslint eqeq:true,node:true,white:true,plusplus:true,nomen:true,unparam:true,devel:true,regexp:true */
/**
* Module dependencies.
*/
"use strict";
/*
var express = require('express')
    , http = require('http')
    , path = require('path')

var app = express();
    // all environments
    app.use(express.bodyParser());
    app.use(express.methodOverride());
*/
var container = require('./lib/container'),
    http =require('http');

module.exports = container;
if (!module.parent) {
    http.createServer(container.get('app')).listen(container.get('port'), function(){
        console.log('server listening on port ' + container.get('port'));
    });
}

