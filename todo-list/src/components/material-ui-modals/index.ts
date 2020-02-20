import { Theme, createMuiTheme } from "@material-ui/core/styles"

interface ModalConfig {
    theme: Theme
}

export const modalConfig: ModalConfig = {
    theme: createMuiTheme()
}

export function setModalTheme(theme: Theme) {
    modalConfig.theme = theme
}

export { MessageDialog } from "./MessageDialog/MessageDialog"
export { LoadingModal } from "./LoadingModal"
export { messageActions } from "./message-actions"
export { messageConfirm } from "./message-confirm"
export { messageError } from "./message-error"
export { messageNoYes } from "./message-no-yes"
export { messageWarning } from "./message-warning"
export { messageYesNo } from "./message-yes-no"
export { snackbar } from "./snackbar"
