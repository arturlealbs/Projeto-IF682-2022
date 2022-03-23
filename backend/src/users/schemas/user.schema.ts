/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender, Education } from '../types/user';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop({ required: true })
  email: string;
  
  @Prop({ required: true })
  firstName: string;
  
  @Prop({ required: true })
  lastName: string;
  
  @Prop({ required: true })
  username: string;
  
  @Prop({ required: true })
  age: number;
  
  @Prop()
  bio?: string;
  
  @Prop({ required: true })
  gender: Gender;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  address: string;
  
  @Prop({ type: [String], required: true })
  Interest: string[];

  @Prop({ type: [String], required: true })
  genderOfInterest: Gender[];
  
  @Prop()
  workWith: string;

  @Prop()
  phoneNumber: string;

  @Prop({ type: String })
  education: Education;

  @Prop({ type: [String]})
  languages: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);