/*jslint eqeq:true,node:true,es5:true,white:true,plusplus:true,nomen:true,unparam:true,devel:true,regexp:true */
"use strict";

module.exports = function(mongoose,url){
    var models = {};
    /**
     * a link submitted by users
     */
    var LinkSchema = mongoose.Schema({
        url:{type:String,required:"Url is required"},
        title:{type:String,required:"Title is required"},
        createdAt:{type:Date,default:Date.now,required:true},
        updatedAt:{type:Date,default:Date.now,required:true}
    });
    LinkSchema.methods.getHost=function () {
        return url.parse(this.url).host;
    }
    models.Link = mongoose.model('Link',LinkSchema);
    return models;
};
