import { observable } from 'mobx'
import Todo from './Todo'

export default class TodoList {
    constructor(name?: string) {
        if (name) this.name = name
    }
    @observable name = "New List"
    @observable todos = [] as Todo[]
}