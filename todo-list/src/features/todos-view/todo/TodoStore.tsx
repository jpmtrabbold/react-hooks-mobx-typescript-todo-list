import { RootStore } from "features/RootStore"
import { TodoRowProps } from "./TodoRow"
import { action, observable, computed } from "mobx"
import { focusWithStartingCaret } from "components/util/util"
import { createContext, createRef } from "react"
import Todo from "entities/Todo"
import { MessageDialogAction } from "components/material-ui-modals/MessageDialog/MessageDialog"
import FormErrorHandler from "components/input-props/form-error-handler"

export class TodoStore {
    constructor(rootStore: RootStore, sp: TodoRowProps) {
        this.rootStore = rootStore
        this.sp = sp
    }
    rootStore: RootStore
    sp: TodoRowProps
    inputRef = createRef<HTMLInputElement | null>()

    @observable errorHandler = new FormErrorHandler<Todo>()
    @observable editableTodo?: Todo

    @observable detailOpen = false

    @action openDetail = () => {
        this.detailOpen = true
        this.editableTodo = this.sp.todo.clone()
        setTimeout(() => {
            this.inputRef.current?.focus()
        }, 100);
    }
    @action closeDetail = () => {
        this.detailOpen = false
    }

    @action saveDetail = () => {
        this.errorHandler.reset()
        if (!this.editableTodo?.description) {
            this.errorHandler.error('description', 'This field is mandatory')
            return
        }
        this.sp.todo.copyFrom(this.editableTodo!)
        this.closeDetail()
    }

    @computed get actions() {
        return [
            {
                name: "Ok",
                callback: this.saveDetail
            },
            {
                name: "Cancel",
                callback: this.closeDetail
            }
        ] as MessageDialogAction[]
    }

    @action onInputKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {

            const { done } = this.sp.todo
            const list = (done ? this.rootStore.doneTodosOnCurrentList : this.rootStore.notDoneTodosOnCurrentList)
            const currentTodoIndex = list.indexOf(this.sp.todo)
            const lastIndex = list.length - 1

            if (event.key === 'ArrowDown') {
                if (currentTodoIndex + 1 <= lastIndex) {
                    focusWithStartingCaret(list[currentTodoIndex + 1].inputRef.current)
                } else {
                    if (!done) {
                        if (this.rootStore.doneTodosOnCurrentList.length > 0) {
                            focusWithStartingCaret(this.rootStore.doneTodosOnCurrentList[0].inputRef.current)
                        }
                    }
                }
            } else if (event.key === 'ArrowUp') {
                if (currentTodoIndex - 1 >= 0) {
                    focusWithStartingCaret(list[currentTodoIndex - 1].inputRef.current)
                } else {
                    if (done) {
                        if (this.rootStore.notDoneTodosOnCurrentList.length > 0) {
                            const last = this.rootStore.notDoneTodosOnCurrentList.length - 1
                            focusWithStartingCaret(this.rootStore.notDoneTodosOnCurrentList[last].inputRef.current)
                        }
                    } else {
                        focusWithStartingCaret(this.rootStore.newTodoInputRef.current)
                    }
                }
            }
        }
    }

}
const rootStore = new RootStore()
const todo = new Todo()
export const TodoStoreContext = createContext(new TodoStore(rootStore, { todo }))

