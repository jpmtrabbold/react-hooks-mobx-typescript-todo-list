import { observable, action, computed, observe, IValueDidChange } from "mobx"
import { AppBarContainerWithDrawerProps } from "./AppBarContainerWithDrawer";

type ParamsProps = AppBarContainerWithDrawerProps &  {
    bigScreen: boolean
    initialDrawerOpen?: boolean
}

export class AppBarContainerWithDrawerStore {
   
    constructor(sp: ParamsProps) {
        this.sp = sp
        this.permanent = sp.bigScreen    
        this.sp.setStore && this.sp.setStore(this)

        observe(this.sp, 'bigScreen', this.bigScreenChanged)
        observe(this.sp, 'initialDrawerOpen', this.initialDrawerOpenChanged)
    }
    sp: ParamsProps

    @observable drawer: HTMLDivElement | null = null
    @observable drawerWidth?: number
    
    @action setDrawer = (drawer: HTMLDivElement | null) => {
        if (drawer) {
            this.drawer = drawer
            this.drawerWidth = this.drawer.clientWidth
            window.removeEventListener('resize', this.setDrawerWidth)
            window.addEventListener('resize', this.setDrawerWidth)
        } else {
            this.drawer = null
            window.removeEventListener('resize', this.setDrawerWidth)
        }
    }

    setDrawerWidth = () => {
        this.drawerWidth = this.drawer?.clientWidth ?? undefined
    }
    
    bigScreenChanged = (change: IValueDidChange<boolean>) => {
        if (change.newValue) {
            this.setBigScreen(true)
        } else {
            this.setBigScreen(false)
        }
    }

    initialDrawerOpenChanged = (change: IValueDidChange<undefined | boolean>) => {
        if (change.newValue !== undefined) {
            this.setOpen(change.newValue)
        }
    }

    @observable open = false
    @observable permanent = true

    @action setBigScreen = (big: boolean) => {
        this.setOpen(big)
        this.permanent = big
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
        if (this.permanent && this.open && this.drawerWidth) {
            return { marginLeft: this.drawerWidth }
        }
        return undefined
    }
}