import { useState } from 'react';

export type FileDownloadHook = {
  setValue: (value: string) => void;
  download: (filename: string) => void;
};

const useFileDownload = (): FileDownloadHook => {
  const [value, setValue] = useState('');

  const download: FileDownloadHook['download'] = (filename) => {
    const element = document.createElement('a');
    const file = new Blob([value], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return {
    setValue,
    download,
  };
};

export default useFileDownload;
