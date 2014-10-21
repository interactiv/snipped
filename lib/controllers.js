/*jslint eqeq:true,node:true,es5:true,white:true,plusplus:true,nomen:true,unparam:true,devel:true,regexp:true */
"use strict";
module.exports = function(Link,q){
    var controllers = {};
    controllers.main = {};
    controllers.main.index = function index(req,res,err){
        q(Link.find().exec())
        .then(function  (links) {
            res.render('index',{links:links});
        })
        .catch(err);
    };
    controllers.main.submit = function submit(req,res,err){
        var link;
        if("POST"===req.method){
            q(Link.create(req.body))
            .then(function(link){
                res.redirect('/');
            })
            .catch(function error(err) {
                console.log(err);
                res.render('submit',{formErrors:err.errors,link:req.body});
            });
        }else{
            res.render('submit');
        }
    }
    return controllers;
};
