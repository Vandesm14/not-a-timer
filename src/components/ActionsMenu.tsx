import { Button } from '@blueprintjs/core';
import React from 'react';
import Div from '../compose/Div';
import Flex from '../compose/Flex';
import { justify } from '../compose/styles';
import { FileDownloadHook } from '../hooks/useFileDownload';

interface ActionsMenuProps {
  download: FileDownloadHook['download'];
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ActionsMenu({
  download,
  handleFileUpload,
}: ActionsMenuProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Flex direction="col">
      <Button
        onClick={() =>
          download(`log-${new Date().toISOString().replaceAll(':', '-')}.json`)
        }
        alignText="left"
      >
        Download
      </Button>
      <Button onClick={() => fileInputRef.current?.click()} alignText="left">
        Upload
      </Button>
      <Div
        css={{
          display: 'none',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          accept="application/json"
        />
      </Div>
    </Flex>
  );
}
