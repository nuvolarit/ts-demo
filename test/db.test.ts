import * as db from '../db';
import {expect} from 'chai';
import {IArticle} from '../models/article';

describe('db test', function() {
    describe('#count()', function() {
        it('should return a number grater than 0', function(done: MochaDone) {
            let title: string = 'milano';
            db.count(title, (c: number) => {
                expect(c).to.greaterThan(0);
                done();
            });
        });
        it('should return 0', function(done: MochaDone) {
            let title: string = '';
            db.count(title, (c: number) => {
                expect(c).to.be.equal(0);
                done();
            });
        });
    });

    describe('#find()', function() {
        it('should be an instance article array', function(done: MochaDone) {
            let title: string = 'milano';
            db.find(title, (r: IArticle[]) => {
                expect(r).be.an.instanceOf(Array);
                done();
            });
        })
    })
});