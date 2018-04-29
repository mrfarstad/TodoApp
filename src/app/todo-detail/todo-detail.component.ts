import { Component, OnInit, Input } from "@angular/core";
import { Todo } from "../todo";

@Component({
  selector: "app-todo-detail",
  templateUrl: "./todo-detail.component.html",
  styleUrls: ["./todo-detail.component.css"]
})
export class TodoDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() todo: Todo;
}
