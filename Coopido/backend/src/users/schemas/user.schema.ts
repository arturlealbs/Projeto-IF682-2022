import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Education } from '../types/education';
import { Gender } from '../types/gender';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

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
  interest: string[];

  @Prop({ type: [String], required: true })
  genderOfInterest: Gender[];

  @Prop()
  workWith?: string;

  @Prop()
  phoneNumber?: string;

  @Prop({ type: String })
  education?: Education;

  @Prop({ type: [String] })
  languages?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
