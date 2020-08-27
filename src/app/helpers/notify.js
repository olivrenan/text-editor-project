import { toast } from "react-toastify";

const errorMsg = error => {
  if (error?.message?.includes("Network")) {
    return "Rede indisponível ou URL incorreta";
  }

  if (Array.isArray(error.response?.data?.errors)) {
    return error.response.data.errors
      .map(err => `${err.field} : ${err.cause}`)
      .join(";");
  }

  return error.message ?? "";
};

const defaultOptions = {
  type: toast.TYPE.INFO,
  autoClose: 5000,
  hideProgressBar: false,
  position: toast.POSITION.TOP_CENTER,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

export default class Notify {
  static notify(msg, options = {}) {
    toast(msg, { ...defaultOptions, ...options });
  }

  static default(msg) {
    this.notify(msg);
  }

  static success(msg) {
    this.notify(msg, { type: toast.TYPE.SUCCESS });
  }

  static info(msg) {
    this.notify(msg, { type: toast.TYPE.INFO });
  }

  static warning(msg) {
    this.notify(msg, { type: toast.TYPE.WARNING });
  }

  static error(msg, error) {
    const message = error ? `${msg} ${errorMsg(error)}` : msg;
    this.notify(message, { type: toast.TYPE.ERROR });
  }
}
