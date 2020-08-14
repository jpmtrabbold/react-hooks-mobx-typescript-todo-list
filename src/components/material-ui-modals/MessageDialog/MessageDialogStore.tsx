import ReactDOM from "react-dom"
import { createRef, createContext } from "react"
import { observable, action, computed } from "mobx"
import { MessageDialogProps, MessageDialogAction } from "./MessageDialog"

export class MessageDialogStore {
    constructor(source: MessageDialogProps) {
        this.source = source
    }
    source: MessageDialogProps

    @observable isOpened = true
    @computed get parentDefinesOpen() {
        return typeof this.source.open === 'boolean'
    }
    
    @computed get open() {
        if (this.parentDefinesOpen) {
            return !!this.source.open
        } else {
            return this.isOpened
        }
    }

    firstButton = createRef<undefined | HTMLInputElement>()
    removed = false

    handleDirectClose = () => {
        return this.handleClose()
    }

    @action handleClose = async (action?: MessageDialogAction) => {
        // in case the caller is using callbacks
        let canGoOn = true

        if (!!action && !!action.preCallbackValidation) {
            canGoOn = await action.preCallbackValidation()
        }

        if (canGoOn) {
            // in case the caller is using async promises
            if (!!this.source.resolve) {
                if (!!action) {
                    this.source.resolve(action)
                }
                else {
                    this.source.resolve({ name: '' })
                }
            }
            if (!!action && !!action.callback) {
                action.callback()
            }

            if (!action) {
                this.source.onClose && this.source.onClose()
            }
            
            this.isOpened = false
            
            if (!!this.source.container) {
                ReactDOM.unmountComponentAtNode(this.source.container)
            }
        }
    }
    
    @computed get hasSeparateContainer() {
        return !!this.source.container
    }

    @computed get hasNormalActions() {
        return this.source.actions && (!this.source.variant || this.source.variant === 'normal')
    }

    @computed get hasBiggerActions() {
        return this.source.actions && this.source.variant === 'bigger actions'
    }
}

export const MessageDialogStoreContext = createContext(new MessageDialogStore({}))