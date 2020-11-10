
import { makeAutoObservable } from 'mobx'
import Todo from './Todo'

export default class TodoList {
    constructor(name?: string, todos?: Todo[]) {
        if (name) this.name = name
        if (todos) this.todos = todos
        makeAutoObservable(this)
    }
    name = "New List"
    todos = [] as Todo[]
}