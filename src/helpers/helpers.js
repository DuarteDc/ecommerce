import { toast } from 'react-toastify';

export const priceFormat = (number) => {
  const price = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(number);

  return price;
}

export const successNotify = (message) => {
  toast.success(message, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black' },
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}

export const infoNotify = (message) => {
  toast.info(message, {
     position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black' },
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}
export const warningNotify = (message) => {
  toast.warn(message, {
     position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black' },
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}

export const errorNotify = (message) => {
  toast.error(message, {
     position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    style: { backgroundColor: 'black' },
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}