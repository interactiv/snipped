/*global require,exports*/
/*
 * GET home page.
 */

"use strict";
var forms = require('mpm.form');
var genders = ['male','female','other'];
var subject_options=[
	{key:"tech",value:"tech"},{key:"politics",value:"politics"}
];

var RegistrationForm=function(){
	var registrationForm = forms.form.createFormBuilder();
	registrationForm.add('text','username',{attributes:{required:true}});
	registrationForm.add('text','password',{attributes:{required:true}});
	registrationForm.add('select','gender',{choices:genders,attributes:{required:true}});
	registrationForm.add('check','tos',{label:"agree to TOS",checked:"checked"});
	registrationForm.add('submit','submit',{label:" ",attributes:{value:'submit'}});
	return registrationForm;
};

exports.index = function(req, res){
 var form = new RegistrationForm();
  if(req.method==="POST"){
  	form.setData(req.body);
  	console.log("POST!!!!",req.params,req.param);
  }
  res.render('index',{form:form});
};