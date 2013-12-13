/*global describe,it */
"use strict";

var expect = require('chai').expect;

describe('FORM',function(){
	var form = require('../lib/form');
	var attributes = {
		value:"a value",
		required:"true",
		class:"a class"
	};
	describe("form.widget.Base",function(){
		var base = new form.widget.Base("base",{'attributes':attributes});
		var html = base.toHTML();
		console.log(base.renderAttributes(base.attributes));
		it('should render properly',function(){
			expect(html).to.contain("value");
		});
	});
});