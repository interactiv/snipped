/*jslint eqeq:true,node:true,es5:true,white:true,plusplus:true,nomen:true,unparam:true,devel:true,regexp:true */
"use strict";
module.exports = function app(express,locals,controllers,nunjucks,debug,middlewares){
    var path =require('path'),
    app = express();
    app.locals=locals;
    app.set('view engine','twig');
    app.use(middlewares.less);
    nunjucks.configure(path.join(__dirname,'../views'),{autoescape:true,watch:debug,express:app});
    app.use(middlewares.static);
    app.use(middlewares.bodyParser);
    if(debug===true){
        app.use(middlewares.logger);
    }
    app.get('/',controllers.main.index);
    app.all('/submit',controllers.main.submit);
    if(debug===true){
        app.use(middlewares.error);   
    }
    return app;
};
