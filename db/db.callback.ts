import {Server, ServerOptions, Db, MongoClient} from 'mongodb';
import {IArticle} from '../models/article';

var o: ServerOptions = {}
var server = new Server('localhost', 27017, o)
var db = new Db('dea', server, { w: 1 });
db.open(function() { });

export function count(title: string, callback: (err: Error, c: number) => void) {
    db.collection("articles")
        .count({ title: { $regex: `\\b${title}\\b`, $options: 'i' } }, (err: Error, count: number) => {
            callback(err, count);
        });
}

export function find(title: string, callback: (err: Error, r: IArticle[]) => void): void {
    db.collection("articles")
        .find({ title: { $regex: `\\b${title}\\b`, $options: 'i' } })
        .toArray((err, articles) => {
            callback(err, articles);
        });
}
