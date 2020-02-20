import { createContext } from "react";
import { observable, action, computed } from "mobx";
import TodoList from "entities/TodoList";
import TodoListFolder from "entities/TodoListFolder";
import Todo from "entities/Todo";
import { TodoFolderStore } from "./TodoFolderStore";

type TodoListOrListFolder = TodoList | TodoListFolder

export class TodoListsStore {
    constructor() {
        this.todoListsAndFolders = [
            new TodoListFolder("Renovations", [
                new TodoList("Bathroom",[
                    new Todo("Mirror"),
                    new Todo("Another mirror"),
                    new Todo("A mirror for the mirror"),
                ]),
                new TodoList("Kitchen"),
                new TodoList("Kids Room"),                
            ]),
            new TodoList("Groceries",[
                new Todo("Milk"),
                new Todo("Bread"),
                new Todo("Cheese"),
            ]),
            new TodoList("Stuff",[
                new Todo("Wash the car"),
                new Todo("Buy fungus medicine"),
                new Todo("Wash my feet"),
            ]),
        ]

        this.folderStore = new TodoFolderStore(this)
    }
    folderStore: TodoFolderStore

    @observable todoListsAndFolders = [] as TodoListOrListFolder[]
    
    @action selectTodoList = (list: TodoList) => {
        this.selectedTodoList = list
    }
    
    @observable selectedTodoList?: TodoList
    @action addTodoToCurrentList(todo: Todo) {
        this.selectedTodoList?.todos.push(todo)
    }

    @computed get titlePrefix() {
        return (this.selectedTodoList && (" - " + this.selectedTodoList.name)) || ""
    }

    @action addNewFolder(folder: TodoListFolder) {
        this.todoListsAndFolders.push(folder)
    }
    
    @computed get hasDoneTasksOnCurrentList() {
        return !!this.selectedTodoList?.todos.find(t => t.done)
    }

}

export const TodoListStoreContext = createContext(new TodoListsStore())