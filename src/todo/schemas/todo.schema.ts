import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Todo {
  @Prop()
  task: string;
  @Prop()
  isTaskCompleted: boolean;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}
export type todoDocument = Todo & Document; //type intersection - todoDocument got the fields of TodoSchema and properties & methods (_id, find()...) of Mongoose Document
export const TodoSchema = SchemaFactory.createForClass(Todo);
