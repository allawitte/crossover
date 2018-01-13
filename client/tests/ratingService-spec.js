'use strict';
describe('RatingHelper', function() {

    var factory;
    var video = {
        ratings: [5, 5, 5, 5, 5]
    }
    beforeEach(module('app'));
    beforeEach(inject(function (_$injector_) {
        factory = _$injector_.get('RatingHelper');
    }));

    it('Should expect rating 100%', function(){
            var rating = factory.getWidth(video);

        expect(rating).toEqual('width: 100%;');
        });

});

/**
 * Created by HP on 1/12/2018.
 */
