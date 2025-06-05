import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Todo {
  @Prop()
  task: string;
  @Prop()
  isTaskCompleted: boolean;
}
export type todoDocument = Todo & Document; //type intersection - todoDocument got the fields of TodoSchema and properties & methods (_id, find()...) of Mongoose Document
export const TodoSchema = SchemaFactory.createForClass(Todo);
