import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TodoService } from '../todo.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  taskForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      deadLine: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.isLoading = true;
      const { name, deadLine } = this.taskForm.value;
      this.todoService
        .createTask(name, deadLine)
        .pipe(
          finalize(() => {
            this.taskForm.reset();
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }
}
