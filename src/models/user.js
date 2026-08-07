import {Schema, model} from 'mongoose';

comsn userSchema = new Schema({});

export const UserModel = model ('user', userSchema);