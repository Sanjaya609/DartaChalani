import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/Dialog/Dialog'
import { Button } from '@/components/ui'
import { getComputedClassNames } from '@/utility/tailwind/tailwind-utility'
import { PropsWithChildren, useMemo } from 'react'
import { ModalSize } from './modal-schema'

interface IFooterBtnProps {
  show?: boolean
  btnTitle?: string
  btnAction?: VoidFunction
  className?: string
  loading?: boolean
  disabled?: boolean
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

  const {
    showCancelBtn,
    cancelBtnAction,
    cancelBtnClassName,
    cancelBtnTitle,
    cancelBtnLoading,
    cancelBtnDisabled,
  } = useMemo(() => {
    return {
      showCancelBtn: cancelBtnProps?.show || true,
      cancelBtnTitle: cancelBtnProps?.btnTitle || 'Cancel',
      cancelBtnAction: cancelBtnProps?.btnAction,
      cancelBtnClassName: getComputedClassNames(cancelBtnProps?.className),
      cancelBtnLoading: cancelBtnProps?.loading,
      cancelBtnDisabled: cancelBtnProps?.loading || saveBtnProps?.loading,
    }
  }, [cancelBtnProps, saveBtnProps?.loading])

  const {
    showSaveBtn,
    saveBtnAction,
    saveBtnClassName,
    saveBtnTitle,
    saveBtnDisabled,
    saveBtnLoading,
  } = useMemo(() => {
    return {
      showSaveBtn: saveBtnProps?.show || true,
      saveBtnTitle: saveBtnProps?.btnTitle || 'Save',
      saveBtnAction: saveBtnProps?.btnAction,
      saveBtnClassName: getComputedClassNames(saveBtnProps?.className),
      saveBtnLoading: saveBtnProps?.loading,
      saveBtnDisabled: saveBtnProps?.loading || cancelBtnProps?.loading,
    }
  }, [saveBtnProps, cancelBtnProps?.loading])

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
          <hr className="w-full  text-gray-56" />
        )}

        <div className={computedBodyClassName}>{children}</div>

        {!removeFooterBorder && !hideFooter && (
          <hr className="w-full  text-gray-56" />
        )}

        {!hideFooter ? (
          customFooter ? (
            customFooter
          ) : (
            <DialogFooter className={computedFooterClassName}>
              {showCancelBtn && (
                <Button
                  variant="secondary"
                  btnType="outlined"
                  className={cancelBtnClassName}
                  onClick={cancelBtnAction}
                  disabled={cancelBtnDisabled}
                  loading={cancelBtnLoading}
                >
                  {cancelBtnTitle}
                </Button>
              )}
              {showSaveBtn && (
                <Button
                  className={saveBtnClassName}
                  onClick={saveBtnAction}
                  disabled={saveBtnDisabled}
                  loading={saveBtnLoading}
                >
                  {saveBtnTitle}
                </Button>
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
