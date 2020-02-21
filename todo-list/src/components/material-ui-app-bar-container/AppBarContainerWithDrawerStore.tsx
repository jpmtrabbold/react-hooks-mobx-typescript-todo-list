import { observable, action, computed } from "mobx"
import { AppBarContainerWithDrawerProps } from "./AppBarContainerWithDrawer";
import useElementSize from "hooks/useElementSize"
type ParamsProps = AppBarContainerWithDrawerProps &  {
    drawerSize: ReturnType<typeof useElementSize>
    bigScreen: boolean
}

export class AppBarContainerWithDrawerStore {
    constructor(sp: ParamsProps) {
        this.sp = sp
        this.permanent = sp.bigScreen    
        this.sp.setStore && this.sp.setStore(this)
    }
    sp: ParamsProps

    @observable firstLoad = true
    @observable open = false
    @observable permanent = true

    @action setBigScreen = (big: boolean) => {
        if (!this.firstLoad) {
            this.setOpen(big)
            this.permanent = big
        }
        this.firstLoad = false
    }

    @action setOpen = (open: boolean) => this.open = open
    @action onClose = () => this.open = false
    @action drawerToggle = () => this.open = !this.open
    @action closeIfTemporary = () => !this.permanent && this.setOpen(false)

    @computed get drawerStyle(): React.CSSProperties {
        return {
            minWidth: 250
        }
    }

    @computed get childrenDivStyle(): React.CSSProperties | undefined {
        if (this.permanent && this.open) {
            return { marginLeft: this.sp.drawerSize.width }
        }
        return undefined
    }
}