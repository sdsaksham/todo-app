import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, todoDocument } from './schemas/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<todoDocument>) {}

  create(todoData: CreateTodoDto) {
    const createdTask = new this.todoModel(todoData);
    return createdTask.save();
  }

  findAll() {
    return this.todoModel.find().exec(); //mongoose methods return thenable that are not real JS promise so exec() is used to convert it into real JS promise
  }

  findOne(id: string) {
    return this.todoModel.findById(id).exec();
  }

  update(id: string, updateTodoData: UpdateTodoDto) {
    return this.todoModel
      .findByIdAndUpdate(id, updateTodoData, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}
