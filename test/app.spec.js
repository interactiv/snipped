/*jslint nomen:true,white:true,node:true,es5:true*/
/*global require,it,describe,beforeEach */
 "use strict";
//@note @node @express : tester une app avec supertest , https://github.com/visionmedia/supertest
describe("app",function(){
    var request = require('supertest');
    beforeEach(function  (done) {
        this.container = require('./../app');
        this.container.value('debug',false);
        this.models = this.container.get('models');
        this.models.Link.remove(done);
        this.agent=request(this.container.get('app'));
    })
	describe('GET /',function(){
		it("is 200",function(done){
			this.agent.get('/').expect(200,done);
		});
	});
	describe('GET /submit',function(){
		it("is 200",function(done){
			this.agent.get('/submit').expect(200,done);
		});
	});
    describe('POST /submit',function(){
        it("is 301",function(done){
            this.agent
                .post('/submit')
                .field('title',"foo")
                .field('url',"http://example.com/gamers")
                .expect(404,function  () {
                    done(new Error('foo'));
                });
        })
    })
});
