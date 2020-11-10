import useStore from "mobx-store-utils"
import React, { useRef, useCallback } from 'react'
import { observer } from "mobx-react-lite"
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MoreVertIcon from "@material-ui/icons/MoreVert"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

export interface MoreButtonAction {
    title: string
    description?: string
    callback: (event: React.MouseEvent<HTMLElement, MouseEvent>) => any
}

interface MoreButtonProps {
    actions: MoreButtonAction[]
    size?: 'small' | 'medium'
    variant?: 'horizontal' | 'vertical'
    className?: string
    style?: React.CSSProperties
}

export const MoreButton = observer(({ actions, size = 'small', variant = 'horizontal', className, style }: MoreButtonProps) => {
    const anchorRef = useRef<HTMLButtonElement | null>(null)
    const store = useStore(sp => ({
        open: false,
        toggleOpen: (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation()
            store.open = !store.open
        },
        close: (event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation()
            store.open = false
        },
    }), { actions })

    return (
        <>
            <IconButton ref={anchorRef} onClick={store.toggleOpen} className={className} style={style} size={size}>
                {variant === 'vertical' ? <MoreVertIcon /> : <MoreHorizIcon />}
            </IconButton>
            <Menu open={store.open} anchorEl={anchorRef.current} onClose={store.close}>
                {actions.map((option, index) => (
                    <MoreButtonItem
                        key={index}
                        option={option}
                        handleClose={store.close}
                    />
                ))}
            </Menu>
        </>
    )
})
interface MoreButtonItemProps {
    option: MoreButtonAction
    handleClose: (event: React.MouseEvent<HTMLElement>) => any
}

const MoreButtonItem = React.forwardRef<HTMLLIElement, MoreButtonItemProps>(({ option, handleClose }, ref) => {
    const { title, callback, description } = option

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        handleClose(event)
        callback(event)
    }, [handleClose, callback])
    
    const text = (
        <Typography variant='inherit'>
            {title}
        </Typography>
    )

    const withTooltip = (!!description ? (
        <Tooltip title={description}>
            {text}
        </Tooltip>
    ): text)

    return (
        <MenuItem ref={ref} onClick={handleClick}>
            {withTooltip}
        </MenuItem>
    )
}) 