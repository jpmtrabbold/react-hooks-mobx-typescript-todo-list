import { createContext } from "react";
import { observable } from "mobx";
import TodoList from "entities/TodoList";
import TodoListGroup from "entities/TodoListGroup";

type TodoListOrListGroup = TodoList | TodoListGroup

export class TodoListStore {
    constructor() {
        this.todoListsAndGroups = [
            new TodoListGroup("Renovations", [
                new TodoList("Bathroom"),
                new TodoList("Kitchen"),
                new TodoList("Kids Room"),                
            ]),
            new TodoList("Groceries"),
            new TodoList("Stuff"),
        ]

    }
    @observable todoListsAndGroups = [] as TodoListOrListGroup[]
}

export const TodoListStoreContext = createContext(new TodoListStore())