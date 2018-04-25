import { Injectable } from "@angular/core";
import { Todo } from "./todos";
import { TODOS } from "./mock-todos";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class TodoService {
  private todosUrl = "http://localhost:5000/api/todo"; // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private log(message: string) {
    this.messageService.add("TodoService: " + message);
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todos[]>(this.todosUrl);
  }
}
