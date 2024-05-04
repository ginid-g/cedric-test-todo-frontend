import { Component } from '@angular/core';
import { TodoService, Task } from '../todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  tasks: Task[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.getTasks().subscribe((result) => {
      this.tasks = result;
    });

    this.todoService.onTaskAdded.subscribe((task: Task) => {
      this.tasks.push(task);
    });
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id != id);
    this.todoService.deleteTask(id).subscribe();
  }

  updateTask(task: Task) {
    this.todoService.updateTask(task).subscribe();
  }
}
