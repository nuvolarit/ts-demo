import * as mongodb from 'mongodb';
import {IArticle} from './models/article';

var o: mongodb.ServerOptions = {}
var server = new mongodb.Server('localhost', 27017, o)
var db = new mongodb.Db('dea', server, { w: 1 });
db.open(function() { });

export function count(title: string, callback: (c: number) => void) {
    if (title.length == 0) {
        callback(0);
    } else {
        db.collection("articles")
            .count({ title: { $regex: `\\b${title}\\b`, $options: 'i' } }, (err: Error, count: number) => {
                if (err) { throw err; }
                callback(count);
            });
    }
}

export function find(title: string, callback: (r) => void): void {
    db.collection("articles")
        .find({ title: { $regex: `\\b${title}\\b`, $options: 'i' } })
        .toArray((err, articles) => {
            if (err) { throw err; }
            callback(articles);
        })
}
