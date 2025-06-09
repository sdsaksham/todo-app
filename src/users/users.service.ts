import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { User as UserInterface } from './interface/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    return this.userModel.find().exec();
  }

  async findUserByUsername(username: string): Promise<UserInterface | null> {
    return this.userModel.findOne({ username });
  }

  async createUser(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds - it is used for hashing the password with random strings
    const user = new this.userModel({ username, password: hashedPassword });
    return user.save();
  }
}
