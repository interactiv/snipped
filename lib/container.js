/*jslint eqeq:true,node:true,es5:true,white:true,plusplus:true,nomen:true,unparam:true,devel:true,regexp:true */
"use strict";

var Injector = require('mpm.injector'),
    c = new Injector;

c.service('app',require('./app'))
    .service('mongoose',function(config,debug){
        var mongoose = require('mongoose');
        mongoose.connect(config.MONGODB);
            mongoose.set('debug',debug) 
        return mongoose;
    })
    .service('nunjucks',function(){
        var nunjucks=require('nunjucks');
        return nunjucks;
    })
    .value('path',require('path'))
    .value('url',require('url'))
    .service('middlewares',require('./middlewares'))
    .service('models',require('./models'))
    .service('controllers',require('./controllers'))
    .service('Link',function(models){
        return models.Link;
    })
    .service('User',function(models){
        return models.User;
    })
    .value('debug',process.env.NODE_ENV == "production" ? false : true)
    .value('q',require('q'))
    .value('port',process.env.PORT||process.env.OPENSHIFT_NODEJS_PORT||3000)
    .value('ip',process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1')
    .value('_',require('lodash'))
    .value('express',require('express'))
    .value('locals',{
        title:'GGNEWS',
        brand:'GGNEWS'
    })
    .service('config',function(debug){
        var env=(process.env.NODE_ENV||"").toLowerCase();
        var config =  {
            MONGODB:process.env.NEWS_MONGODB
        };
        if(env==="test"||env==="testing"){
            config.MONGODB = process.env.NEWS_MONGODB_TEST
        }
        return config;
    });

module.exports = c;
