import { Injectable } from "@angular/core";
import { Todo } from "./todo";
import { TODOS } from "./mock-todos";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

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
    return this.http
      .get<Todo[]>(this.todosUrl)
      .pipe(
        tap(todos => this.log(`fetched todos`)),
        catchError(this.handleError("getTodos", []))
      );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(this.todosUrl, todo, httpOptions)
      .pipe(
        tap((todo: Todo) => this.log(`added todo w/ id=${todo.id}`)),
        catchError(this.handleError<Todo>("addTodo"))
      );
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http
      .put<Todo>(`${this.todosUrl}/${todo.id}`, todo, httpOptions)
      .pipe(
        tap(_ => this.log(`updated todo id=${todo.id}`)),
        catchError(this.handleError<any>("updateTodo"))
      );
  }

  deleteTodo(todo: Todo | number): Observable<Todo> {
    const id = typeof todo === "number" ? todo : todo.id;
    const url = `${this.todosUrl}/${id}`;
    return this.http
      .delete<Todo>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero=${id}`)),
        catchError(this.handleError<Todo>("deleteTodo"))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
