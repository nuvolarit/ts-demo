import * as db from '../db/db.callback';
import * as dbpromise from '../db/db.promise';
import * as dbrx from '../db/db.rx';
import {expect} from 'chai';
import {IArticle} from '../models/article';

describe('db test', function() {
    describe('#count():callback', function() {
        it('should return a number grater than 0', function(done: MochaDone) {
            let title: string = 'milano';
            db.count(title, (err, c: number) => {
                expect(c).to.greaterThan(0);
                done();
            });
        });
    });

    describe('#find():callback', function() {
        it('should be an instance of article array', function(done: MochaDone) {
            let title: string = 'milano';
            db.find(title, (err, r: IArticle[]) => {
                expect(r).be.an.instanceOf(Array);
                done();
            });
        })
    })

    describe('#find():promise', function() {
        it('should be an instance of article array', function(done: MochaDone) {
            let title: string = 'milano';
            dbpromise.find(title).then((r: IArticle[]) => {
                expect(r).be.an.instanceOf(Array);
                done();
            });
        })
    })

    describe('#find():rx', function() {
        it('should be an instance of article array', function(done: MochaDone) {
            let title: string = 'milano';
            dbrx.find(title).subscribe((r: IArticle[]) => {
                expect(r).be.an.instanceOf(Array);
                done();
            });
        })
    })
});