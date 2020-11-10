import { createContext, createRef } from "react"
import { IObservableArray, makeAutoObservable } from "mobx"
import TodoList from "entities/TodoList"
import Todo from "entities/Todo"
import { FolderListStore } from "./todo-lists-view/folder-list-dialog/FolderListStore"
import TodoListFolder from "entities/TodoListFolder"
import { focusWithStartingCaret, removeItemFromArray } from "components/util/util"
import { AppBarContainerWithDrawerStore } from "components/material-ui-app-bar-container/AppBarContainerWithDrawerStore"
import { messageYesNo, snackbar } from "components/material-ui-modals"
import DisposableReactionsStore from "mobx-store-utils/dist/DisposableReactionsStore"

type TodoListOrListFolder = TodoList | TodoListFolder

export class RootStore {
    static reactions(store: RootStore, disposableStore: DisposableReactionsStore) {
        disposableStore.registerReaction(() => store.todoListsAndFolders as IObservableArray<TodoListOrListFolder>,
            () => store.appBarStore?.setDrawerWidth()
        )
    }

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

        this.folderStore = new FolderListStore(this)
        makeAutoObservable(this)
    }

    folderStore: FolderListStore

    todoListsAndFolders: TodoListOrListFolder[]

     selectTodoList = (list: TodoList) => {
        this.selectedTodoList = list
        setTimeout(() => {
            this.newTodoFocus()
        });
    }
    selectedTodoList?: TodoList

     get titlePrefix() {
        return (this.selectedTodoList && (" - " + this.selectedTodoList.name)) || ""
    }

     addNewFolder(folder: TodoListFolder) {
        this.todoListsAndFolders.push(folder)
    }

     deleteFolder = async (listFolder: TodoListFolder) => {

        if (await messageYesNo({
            title: "Folder deletion",
            content: `Do you confirm the '${listFolder.name}' folder deletion?`
        })) {
            removeItemFromArray(this.todoListsAndFolders, listFolder)
            snackbar({ title: `The folder '${listFolder.name}' was deleted successfully`, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, variant: 'success' })
        }
    }

     deleteList = async (list: TodoList, folder?: TodoListFolder) => {

        if (await messageYesNo({
            title: "List deletion",
            content: `Do you confirm the '${list.name}' list deletion?`
        })) {
            removeItemFromArray((folder ? folder.lists : this.todoListsAndFolders), list)
            if (list === this.selectedTodoList) {
                this.selectedTodoList = undefined
            }
            snackbar({ title: `The list '${list.name}' was deleted successfully`, anchorOrigin: { vertical: 'bottom', horizontal: 'right' }, variant: 'success' })
        }
    }

     addNewList(list: TodoList, folder?: TodoListFolder) {
        if (folder) {
            folder.lists.push(list)
            this.appBarStore?.setDrawerWidth()

        } else {
            this.todoListsAndFolders.push(list)
        }
        this.selectTodoList(list)
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