import { TodosViewProps } from "./TodosView";
import { computed, action } from "mobx";
import Todo from "entities/Todo";
import { removeItemFromArray } from "components/util/util";
import { createContext } from "react";

export class TodosStore {
    constructor(sp: TodosViewProps) {
        this.sp = sp
    }
    sp: TodosViewProps

    @action addTodoToCurrent(todo: Todo) {
        this.sp.todos.push(todo)
    }

    @action deleteTodo = (todo: Todo) => {
        removeItemFromArray(this.sp.todos, todo)
    }
    @computed get doneTodosOnCurrentList() {
        return this.sp.todos.filter(t => t.done) || []
    }

    @computed get notDoneTodosOnCurrentList() {
        return this.sp.todos.filter(t => !t.done) || []
    }

    @computed get hasDoneTodosOnCurrentList() {
        return this.doneTodosOnCurrentList.length > 0
    }
}

export const TodosStoreContext = createContext(new TodosStore({ todos: [] }))