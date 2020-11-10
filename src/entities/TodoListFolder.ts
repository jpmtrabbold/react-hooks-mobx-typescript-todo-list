
import TodoList from './TodoList'
import { CollapsibleListItemStore } from 'components/material-ui-list-items/CollapsibleListItem'
import { makeAutoObservable } from 'mobx'

export default class TodoListFolder {
    constructor(name?: string, lists?: TodoList[]) {
        if (name) this.name = name
        if (lists) this.lists = lists
        makeAutoObservable(this)
    }
    name = "New List Folder"
    lists = [] as TodoList[]
    collapsibleStore?: CollapsibleListItemStore
    setCollapsibleStore = (collapsibleStore: CollapsibleListItemStore) => this.collapsibleStore = collapsibleStore
}