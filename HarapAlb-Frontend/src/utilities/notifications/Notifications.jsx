import { toast } from "react-toastify";

export const successToast = (message) =>
  toast.success(`${message}`, { autoClose: 2000 });

export const warningToast = (message) =>
  toast.warning(`${message}`, { autoClose: 2000 });

export const errorToast = (message) =>
  toast.error(`${message}`, { autoClose: 2200 });

export const longSuccessToast = (message) =>
  toast.success(`${message}`, { autoClose: 4500 });

export const longWarningToast = (message) =>
  toast.warning(`${message}`, { autoClose: 4500 });

export const longErrorToast = (message) =>
  toast.error(`${message}`, { autoClose: 4500 });

