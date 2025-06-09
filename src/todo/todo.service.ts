import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, todoDocument } from './schemas/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<todoDocument>) {}

  create(todoData: CreateTodoDto, userId: string) {
    const createdTask = new this.todoModel({ ...todoData, user: userId });
    return createdTask.save();
  }

  async findAll(userId: string) {
    return this.todoModel.find({ user: userId }).exec(); //mongoose methods return query objects that are used for further chaining, so exec() is used to execute the query objects and get real JS promise
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
