import { useState } from 'react';

type FileDownloadHook = {
  setValue: (value: string) => void;
  download: () => void;
};

const useFileDownload = (name: string): FileDownloadHook => {
  const [value, setValue] = useState('');

  const download = () => {
    const element = document.createElement('a');
    const file = new Blob([value], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = name;
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
