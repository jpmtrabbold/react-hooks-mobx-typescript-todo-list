
import { makeAutoObservable } from "mobx";
import DisposableReactionsStore from "mobx-store-utils/dist/DisposableReactionsStore";
import { AppBarContainerWithDrawerProps } from "./AppBarContainerWithDrawer";

type ParamsProps = AppBarContainerWithDrawerProps &  {
    bigScreen: boolean
    initialDrawerOpen?: boolean
}

export class AppBarContainerWithDrawerStore {
    static reactions(store: AppBarContainerWithDrawerStore, disposableStore: DisposableReactionsStore) {
        disposableStore.registerAutorun(() => store.bigScreenChanged(store.sp.bigScreen))
        disposableStore.registerAutorun(() => store.initialDrawerOpenChanged(store.sp.initialDrawerOpen))
    }
   
    constructor(sp: ParamsProps) {
        this.sp = sp
        this.permanent = sp.bigScreen    
        this.sp.setStore && this.sp.setStore(this)
        makeAutoObservable(this)
    }
    sp: ParamsProps

    drawer: HTMLDivElement | null = null
    drawerWidth?: number
    
     setDrawer = (drawer: HTMLDivElement | null) => {
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
        setTimeout(() => {
            this.drawerWidth = this.drawer?.clientWidth ?? undefined   
        });
    }
    
    bigScreenChanged = (newValue: boolean) => {
        if (newValue) {
            this.setBigScreen(true)
        } else {
            this.setBigScreen(false)
        }
    }

    initialDrawerOpenChanged = (newValue?: boolean) => {
        if (newValue !== undefined) {
            this.setOpen(newValue)
        }
    }

    open = false
    permanent = true

     setBigScreen = (big: boolean) => {
        this.setOpen(big)
        this.permanent = big
    }

     setOpen = (open: boolean) => this.open = open
     onClose = () => this.open = false
     drawerToggle = () => this.open = !this.open
     closeIfTemporary = () => !this.permanent && this.setOpen(false)

     get drawerStyle(): React.CSSProperties {
        return {
            minWidth: 250
        }
    }

     get childrenDivStyle(): React.CSSProperties | undefined {
        if (this.permanent && this.open && this.drawerWidth) {
            return { marginLeft: this.drawerWidth }
        }
        return undefined
    }
}