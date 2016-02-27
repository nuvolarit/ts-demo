import {Server, ServerOptions, Db, MongoClient} from 'mongodb';
import {IArticle} from '../models/article';

var o: ServerOptions = {}
var server = new Server('localhost', 27017, o)
var db = new Db('dea', server, { w: 1 });
db.open(function() { });

export function count(title: string): Promise<number> {
    return db.collection("articles")
        .count({ title: { $regex: `\\b${title}\\b`, $options: 'i' } })
}

export function find(title: string): Promise<IArticle[]> {
    return db.collection("articles")
        .find({ title: { $regex: `\\b${title}\\b`, $options: 'i' } })
        .toArray();
}
