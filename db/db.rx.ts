import {MongoClient, Db, Server, ServerOptions} from 'mongodb';
import * as Rx from "rx";
import {IArticle} from '../models/article';

var o: ServerOptions = {}
var server = new Server('localhost', 27017, o)
var db = new Db('dea', server, { w: 1 });
db.open(function() { });

export function count(title: string): Rx.Observable<number> {
    return Rx.Observable.create((observer: Rx.Observer<number>) => {
        db.collection("articles")
            .count({ title: { $regex: `\\b${title}\\b`, $options: 'i' } }, (err, count) => {
                if (err) { observer.onError(err); }
                observer.onNext(count);
                observer.onCompleted();
            });
    });
}

export function find(title: string): Rx.Observable<IArticle[]> {
    return Rx.Observable.create((observer: Rx.Observer<IArticle[]>) => {
        db.collection("articles")
            .find({ title: { $regex: `\\b${title}\\b`, $options: 'i' } })
            .toArray((err, result) => {
                if (err) { observer.onError(err); }
                observer.onNext(result);
                observer.onCompleted();
            });
    });
}