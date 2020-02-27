import { createContext, createRef } from "react"
import { observable, action, computed, observe, IObservableArray } from "mobx"
import TodoList from "entities/TodoList"
import Todo from "entities/Todo"
import { FolderListStore } from "./todo-lists-view/folder-list-dialog/FolderListStore"
import TodoListFolder from "entities/TodoListFolder"
import { focusWithStartingCaret, removeItemFromArray } from "components/util/util"
import { AppBarContainerWithDrawerStore } from "components/material-ui-app-bar-container/AppBarContainerWithDrawerStore"
import { messageYesNo, snackbar } from "components/material-ui-modals"

type TodoListOrListFolder = TodoList | TodoListFolder

export class RootStore {

    constructor() {
        this.todoListsAndFolders = [
            new TodoListFolder("Renovations", [
                new TodoList("Bathroom", [
                    new Todo("Mirror"),
                    new Todo("Another mirror"),
                    new Todo("A mirror for the mirror"),
                ]),
                new TodoList("Kitchen"),
                new TodoList("Kids Room"),
            ]),
            new TodoList("Groceries", [
                new Todo("Milk"),
                new Todo("Bread"),
                new Todo("Cheese"),
            ]),
            new TodoList("Stuff", [
                new Todo("Wash the car"),
                new Todo("Buy fungus medicine"),
                new Todo("Wash my feet"),
            ]),
        ]
        observe(this.todoListsAndFolders as IObservableArray<TodoListOrListFolder>, () => setTimeout(() => {
            this.appBarStore?.setDrawerWidth()
        }))
        this.folderStore = new FolderListStore(this)
    }

    folderStore: FolderListStore

    @observable todoListsAndFolders: TodoListOrListFolder[]

    @action selectTodoList = (list: TodoList) => {
        this.selectedTodoList = list
        setTimeout(() => {
            this.newTodoFocus()
        });
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

    @action deleteFolder = async (listFolder: TodoListFolder) => {
        if (await messageYesNo({ title: "Folder deletion", content: `Do you confirm the '${listFolder.name}' folder deletion?` })) {
            removeItemFromArray(this.todoListsAndFolders, listFolder)
            snackbar({ title: `The folder '${listFolder.name}' was deleted successfully`, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, variant: 'success' })
        }
    }
    @action deleteList = async (list: TodoList, folder?: TodoListFolder) => {
        if (await messageYesNo({ title: "List deletion", content: `Do you confirm the '${list.name}' list deletion?` })) {
            removeItemFromArray((folder ? folder.lists : this.todoListsAndFolders), list)
            if (list === this.selectedTodoList) {
                this.selectedTodoList = undefined
            }
            snackbar({ title: `The list '${list.name}' was deleted successfully`, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, variant: 'success' })
        }
    }

    @action addNewList(list: TodoList, folder?: TodoListFolder) {
        if (folder) {
            folder.lists.push(list)
        } else {
            this.todoListsAndFolders.push(list)
        }

    }

    @computed get doneTodosOnCurrentList() {
        return this.selectedTodoList?.todos.filter(t => t.done) || []
    }

    @computed get notDoneTodosOnCurrentList() {
        return this.selectedTodoList?.todos.filter(t => !t.done) || []
    }

    @computed get hasDoneTodosOnCurrentList() {
        return this.doneTodosOnCurrentList.length > 0
    }

    newTodoInputRef = createRef<HTMLInputElement | null>()

    newTodoFocus = () => {
        focusWithStartingCaret(this.newTodoInputRef.current)
    }

    appBarStore?: AppBarContainerWithDrawerStore
    setAppBarStore = (store: AppBarContainerWithDrawerStore) => {
        this.appBarStore = store
    }
}

export const RootStoreContext = createContext(new RootStore())