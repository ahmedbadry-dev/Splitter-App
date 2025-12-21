
declare const Toastify: any
type ToastType = 'success' | 'error' | 'info'

const toastStyles: Record<ToastType, string> = {
  success: 'linear-gradient(to right, #00b09b, #96c93d)',
  error: 'linear-gradient(to right, #ff416c, #ff4b2b)',
  info: 'linear-gradient(to right, #2193b0, #6dd5ed)',
}

export function showToast(
  message: string,
  type: ToastType = 'success'
) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: toastStyles[type],
    },
  }).showToast()
}
