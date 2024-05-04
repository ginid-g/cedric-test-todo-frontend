import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject, map } from 'rxjs';

export interface Task {
  id: number;
  name: string;
  deadLine: string;
  createdAt: string;
  isCompleted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = environment.API_URL;

  public onTaskAdded: Subject<Task> = new Subject();

  constructor(private http: HttpClient) {}

  // Create a new task
  createTask(name: string, deadLine: string): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}`, { name, deadLine }).pipe(
      map((value) => {
        this.onTaskAdded.next(value);
        return value;
      })
    );
  }

  // Get all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}`);
  }

  // Update a task
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}`, task);
  }

  // Delete a task
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
