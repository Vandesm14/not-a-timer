import { Toast, Toaster } from '@blueprintjs/core';
import React, { ReactElement } from 'react';

type ToastDataType = { message: string; ts: number };

export type UseToaster = {
  addToast: (message: string) => void;
  toaster: ReactElement;
};

export default function useToaster(): UseToaster {
  const [toasts, setToasts] = React.useState<ToastDataType[]>([]);

  const addToast = (message: string) => {
    const ts = Date.now();
    setToasts((toasts) => [...toasts, { message, ts }]);

    setTimeout(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.ts !== ts));
    }, 2000);
  };

  const toaster = (
    <Toaster position="top">
      {toasts.map((toast) => (
        <Toast key={toast.ts} message={toast.message} />
      ))}
    </Toaster>
  );

  return { addToast, toaster };
}
