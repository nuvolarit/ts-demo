import {ObjectID} from 'mongodb';

export interface IArticle {
    _id: ObjectID,
    title: string,
    pub_date: Date
}
