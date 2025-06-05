import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: 'Task cannot be missing' })
  task: string;

  @IsBoolean()
  isTaskCompleted: boolean;
}
