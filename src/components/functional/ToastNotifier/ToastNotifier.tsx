
import { Id, toast as RToast } from 'react-toastify';

export enum ToastType { success = 'success', error = 'error', warn = 'warn' }

interface IInitToastContent {
  type: ToastType, message: Id
}

function toast({ type, message }: IInitToastContent): void {
  RToast[type](message, {
    toastId: message
  })
}

export default toast





