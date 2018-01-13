'use strict';
describe('routing', function(){
    var $state;
    beforeEach(module('app'));
    beforeEach(inject(function(_$state_){
       $state = _$state_;
    }));

    describe('home', function(){
        var state;

        it('Should have correct URL', function(){
            state = $state.get('/home');
            expect(state.url).toEqual('');
        });

        it('Should have correct templateUrl', function(){
            state = $state.get('/home');
            expect(state.templateUrl).toEqual('pages/home.html');
        });

        it('Should have correct controller', function(){
            state = $state.get('/home');
            expect(state.controller).toEqual('HomeController');
        });

        it('Should have be abstract', function(){
            state = $state.get('/home');
            expect(state.abstract).toEqual(true);
        });
    })

    describe('login', function(){
        var state;

        it('Should have correct URL', function(){
            state = $state.get('/home.login');
            expect(state.url).toEqual('/login');
        });

        it('Should have correct templateUrl', function(){
            state = $state.get('/home.login');
            expect(state.templateUrl).toEqual('pages/login.html');
        });

        it('Should have correct controller', function(){
            state = $state.get('/home.login');
            expect(state.controller).toEqual('LoginController');
        });

    })

    describe('videos', function(){
        var state;

        it('Should have correct URL', function(){
            state = $state.get('/home.videos');
            expect(state.url).toEqual('/videos/:sessionId');
        });

        it('Should have correct templateUrl', function(){
            state = $state.get('/home.videos');
            expect(state.templateUrl).toEqual('pages/videos.html');
        });

        it('Should have correct controller', function(){
            state = $state.get('/home.videos');
            expect(state.controller).toEqual('VideosController');
        });

    });

    describe('videos', function(){
        var state;

        it('Should have correct URL', function(){
            state = $state.get('/home.video');
            expect(state.url).toEqual('/video/:videoId/:sessionId');
        });

        it('Should have correct templateUrl', function(){
            state = $state.get('/home.video');
            expect(state.templateUrl).toEqual('pages/video.html');
        });

        it('Should have correct controller', function(){
            state = $state.get('/home.video');
            expect(state.controller).toEqual('VideoController');
        });

    })


});
/**
 * Created by HP on 1/12/2018.
 */
