import {Schema, model} from 'mongoose';

comsn articleSchema = new Schema({});

export const ArticleModel = model ('article', articleSchema);