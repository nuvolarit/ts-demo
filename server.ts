import {MongoClient, ObjectID, Db, Cursor, } from 'mongodb';
import assert = require('assert');

const url: string = 'mongodb://localhost:27017/dea';

interface IArticle {
    _id: ObjectID,
    //dea_id: string,
    title: string,
    // subtitle: string,
    // author: string,
    pub_date: Date,
    // text: string
}

var findArticles = function(db: Db, callback: (articles: IArticle[]) => void) {
    db.collection("articles")
        .find({})
        .limit(10)
        .toArray().then((result: IArticle[]) => {
            callback(result);
        });
        
        
        
    // .then((value: IArticle[]) => {
    //     value.forEach((v: IArticle, i: number) => {
    //         console.log(`${i}) ${v.pub_date.toLocaleDateString()} - ${v.title}`)
    //     });
    //     callback();
    // })
    // .catch((err) => {
    //     throw err;
    // });
        
        
    // cursor.count(false).then((value: number) => {
    //     console.log(value);
    //     callback();
    // });
};

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findArticles(db, (result: IArticle[]) => {
        console.log(result.length);
        console.log('close db');
        db.close();
    });
});