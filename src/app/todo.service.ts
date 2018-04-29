import { Injectable } from "@angular/core";
import { Todo } from "./todos";
import { TODOS } from "./mock-todos";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

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
      .get<Todos[]>(this.todosUrl)
      .pipe(
        tap(todos => this.log(`fetched todos`)),
        catchError(this.handleError("getTodos", []))
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
