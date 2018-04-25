import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { TodosComponent } from "./todos/todos.component";
import { TodoService } from "./todo.service";
import { MessagesComponent } from "./messages/messages.component";
import { MessageService } from "./message.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, TodosComponent, MessagesComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [TodoService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
