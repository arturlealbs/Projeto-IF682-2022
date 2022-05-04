import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RelationshipDocument = Relationship & Document;

@Schema()
export class Relationship {
  @Prop({ type: [String], required: true })
  contacts: string[];

  @Prop({ type: String })
  blockedEmail: string;

  @Prop({ required: true })
  blocked: boolean;
}

export const RelationshipSchema = SchemaFactory.createForClass(Relationship);
