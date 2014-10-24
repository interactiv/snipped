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
    .value('port',process.env.PORT||3000)
    .value('_',require('lodash'))
    .value('express',require('express'))
    .value('locals',{
        title:'Gamers Are People',
        brand:'Gamers are People'
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
