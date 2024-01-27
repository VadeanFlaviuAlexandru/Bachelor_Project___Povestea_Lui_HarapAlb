import { toast } from "react-toastify";

export const successToast = (message) =>
  toast.success(`${message}`, {
    pauseOnHover: true,
    closeOnClick: true,
    theme: "dark",
    autoClose: 2000,
  });

export const warningToast = (message) =>
  toast.warning(`${message}`, {
    pauseOnHover: true,
    closeOnClick: true,
    theme: "dark",
    autoClose: 2000,
  });

export const errorToast = (message) =>
  toast.error(`${message}`, {
    pauseOnHover: true,
    closeOnClick: true,
    theme: "dark",
    autoClose: 2200,
  });

export const longSuccessToast = (message) =>
  toast.success(`${message}`, {
    pauseOnHover: true,
    closeOnClick: true,
    theme: "dark",
    autoClose: 4500,
  });

export const longTip = (message) =>
  toast(`${message}`, {
    pauseOnHover: true,
    closeOnClick: true,
    theme: "dark",
    autoClose: 8500,
  });

export const veryLongTip = (message) =>
  toast(`${message}`, {
    pauseOnHover: true,
    closeOnClick: true,
    theme: "dark",
    autoClose: 15000,
  });

export const longWarningToast = (message) =>
  toast.warning(`${message}`, {
    pauseOnHover: true,
    closeOnClick: true,
    theme: "dark",
    autoClose: 4500,
  });

export const longErrorToast = (message) =>
  toast.error(`${message}`, {
    pauseOnHover: true,
    closeOnClick: true,
    theme: "dark",
    autoClose: 4500,
  });
