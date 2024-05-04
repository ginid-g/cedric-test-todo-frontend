import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../todo.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input('task') task!: Task;
  @Output('onDeleteTask') onDeleteTask: EventEmitter<number> =
    new EventEmitter();

  @Output('onUpdateTask') onUpdateTask: EventEmitter<Task> = new EventEmitter();

  deleteTask() {
    this.onDeleteTask.emit(this.task.id);
  }

  updateStatus() {
    this.task.isCompleted = !this.task.isCompleted;
    this.onUpdateTask.emit(this.task);
  }
}
