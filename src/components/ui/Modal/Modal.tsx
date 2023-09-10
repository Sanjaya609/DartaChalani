import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/Dialog/Dialog'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { ModalSize } from './modal-schema'
import { useMemo, PropsWithChildren } from 'react'

interface IFooterBtnProps {
  show: boolean
  btnTitle: string
  btnAction: VoidFunction
  className: string
}

interface IModalProps extends PropsWithChildren {
  open: boolean
  toggleModal: VoidFunction
  contentClassName?: boolean
  size?: keyof typeof ModalSize
  removeHeaderBorder?: boolean
  removeFooterBorder?: boolean
  hideCloseIcon?: boolean
  title?: string | React.ReactNode
  titleClassName?: string
  hideFooter?: boolean
  customFooter?: React.ReactNode
  cancelBtnProps?: IFooterBtnProps
  saveBtnProps?: IFooterBtnProps
  bodyClassName?: string
  footerClassName?: string
}

const Modal = (props: IModalProps) => {
  const {
    contentClassName,
    size = 'md',
    toggleModal,
    open,
    removeHeaderBorder,
    removeFooterBorder,
    hideCloseIcon,
    title = 'test title',
    titleClassName,
    hideFooter,
    customFooter,
    cancelBtnProps,
    saveBtnProps,
    children,
    bodyClassName,
    footerClassName,
  } = props

  const { showCancelBtn, cancelBtnAction, cancelBtnClassName, cancelBtnTitle } =
    useMemo(() => {
      return {
        showCancelBtn: cancelBtnProps?.show || true,
        cancelBtnTitle: cancelBtnProps?.btnTitle || 'Cancel',
        cancelBtnAction: cancelBtnProps?.btnAction,
        cancelBtnClassName: getComputedClassNames(cancelBtnProps?.className),
      }
    }, [cancelBtnProps])

  const { showSaveBtn, saveBtnAction, saveBtnClassName, saveBtnTitle } =
    useMemo(() => {
      return {
        showSaveBtn: saveBtnProps?.show || true,
        saveBtnTitle: saveBtnProps?.btnTitle || 'Save',
        saveBtnAction: saveBtnProps?.btnAction,
        saveBtnClassName: getComputedClassNames(saveBtnProps?.className),
      }
    }, [saveBtnProps])

  const computedContentClassName = getComputedClassNames(
    ModalSize[size],
    contentClassName
  )

  const computedBodyClassName = getComputedClassNames('px-6', bodyClassName)

  const computedFooterClassName = getComputedClassNames(footerClassName)

  return (
    <Dialog open={open} onOpenChange={toggleModal}>
      <DialogContent className={computedContentClassName}>
        {!hideCloseIcon && <DialogClose />}
        {title && (
          <DialogHeader className="border-bottom border-gray-56">
            {typeof title === 'string' ? (
              <DialogTitle className={titleClassName}>{title}</DialogTitle>
            ) : (
              title
            )}
          </DialogHeader>
        )}
        {!removeHeaderBorder && title && (
          <hr className="w-full py-6 text-gray-56" />
        )}

        <div className={computedBodyClassName}>{children}</div>

        {!removeFooterBorder && !hideFooter && (
          <hr className="py-6text-gray-56 w-full" />
        )}

        {!hideFooter ? (
          customFooter ? (
            customFooter
          ) : (
            <DialogFooter className={computedFooterClassName}>
              {showCancelBtn && (
                <button
                  className={cancelBtnClassName}
                  onClick={cancelBtnAction}
                >
                  {cancelBtnTitle}
                </button>
              )}
              {showSaveBtn && (
                <button className={saveBtnClassName} onClick={saveBtnAction}>
                  {saveBtnTitle}
                </button>
              )}
            </DialogFooter>
          )
        ) : (
          <></>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
