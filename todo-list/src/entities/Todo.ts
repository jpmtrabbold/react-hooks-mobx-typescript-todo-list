import { observable, action } from 'mobx'
import moment from 'moment'
import { createRef } from 'react'

let id = 0
export default class Todo {
    constructor(description?: string) {
        if (description) this.description = description
        this.id = ++id
    }

    inputRef = createRef<HTMLInputElement>()
    id: number
    @observable done = false
    @observable description = ""
    
    @observable notes = ""
    @observable dueDate: Date | null = null
    @observable todos = [] as Todo[]

    @action clone = () => {
        const newTodo = new Todo(this.description);
        newTodo.id = this.id
        newTodo.done = this.done 
        newTodo.notes = this.notes 
        newTodo.dueDate = this.dueDate
        newTodo.todos = this.todos.map(t => t.clone())
        return newTodo
    }

    @action copyFrom = (todo: Todo) => {
        this.id = todo.id
        this.description = todo.description
        this.done = todo.done 
        this.notes = todo.notes 
        this.dueDate = todo.dueDate
        this.todos = todo.todos.map(t => t.clone())
    }
}