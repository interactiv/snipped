module.exports =function  middlewares(debug,express) {
    var  middlewares = {},
        path=require('path'),
        bodyParser=require('body-parser'),
        errorhandler=require('errorhandler'),
        less_middleware=require('less-middleware');
    //@note @node @express : compile less files, https://github.com/emberfeather/less.js-middleware
    middlewares.less = less_middleware({src:path.join(__dirname,'../public'),compress:true});
    /* https://github.com/expressjs/morgan */
    middlewares.logger = require('morgan')('combined');
    middlewares.static = express.static(path.join(__dirname, '../public'));
    middlewares.error = errorhandler();
    middlewares.bodyParser=bodyParser.urlencoded();
    return middlewares;
}
