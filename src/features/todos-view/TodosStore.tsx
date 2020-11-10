import { TodosViewProps } from "./TodosView";
import Todo from "entities/Todo";
import { removeItemFromArray } from "components/util/util";
import { createContext } from "react";

export class TodosStore {
    constructor(sp: TodosViewProps) {
        this.sp = sp
    }
    sp: TodosViewProps

     addTodoToCurrent(todo: Todo) {
        this.sp.todosContainer.todos.push(todo)
    }

     deleteTodo = (todo: Todo) => {
        removeItemFromArray(this.sp.todosContainer.todos, todo)
    }
     get doneTodosOnCurrentList() {
        return this.sp.todosContainer.todos.filter(t => t.done) || []
    }

     get notDoneTodosOnCurrentList() {
        return this.sp.todosContainer.todos.filter(t => !t.done) || []
    }

     get hasDoneTodosOnCurrentList() {
        return this.doneTodosOnCurrentList.length > 0
    }
}

export const TodosStoreContext = createContext(new TodosStore({ todosContainer: { todos: [] } }))