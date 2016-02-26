import * as mongodb from 'mongodb';
import * as Rx from "rx";
import {IArticle} from './models/article';

const uri: string = 'mongodb://localhost:27017/dea';

function connect(): Rx.Observable<mongodb.Db> {
    return Rx.Observable.fromPromise(mongodb.MongoClient.connect(uri));
}


export function count() {
    return connect().flatMap((db: mongodb.Db) => {
        return Rx.Observable.create((observer: Rx.Observer<number>) => {
            db.collection("articles").count({}, (err, count) => {
                if (err) { observer.onError(err); }
                observer.onNext(count);
                observer.onCompleted();
            });
            return function() {
                db.close();
            };
        });
    });
}

