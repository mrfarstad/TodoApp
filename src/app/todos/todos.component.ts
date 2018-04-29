import { Component, OnInit } from "@angular/core";
import { Todo } from "../todo";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"]
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  status = "isComplete";

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  onSelect(todo: Todo): void {
    this.todoService
      .updateTodo({ ...todo, isComplete: !todo.isComplete })
      .subscribe(_ => {
        this.todos = this.todos.map(
          t => (t.id === todo.id ? { ...t, isComplete: !t.isComplete } : t)
        );
      });
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => (this.todos = todos));
  }

  add(description: string): void {
    description = description.trim();
    if (!description) {
      return;
    }
    this.todoService
      .addTodo({ name: description } as Todo)
      .subscribe(todo => this.todos.push(todo));
  }

  delete(todo: Todo): void {
    this.todos = this.todos.filter(t => t !== todo);
    this.todoService.deleteTodo(todo).subscribe();
  }
}
