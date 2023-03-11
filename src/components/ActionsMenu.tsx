import { Button } from '@blueprintjs/core';
import React from 'react';
import Div from '../compose/Div';
import Flex from '../compose/Flex';
import { justify } from '../compose/styles';
import { FileDownloadHook } from '../hooks/useFileDownload';

interface ActionsMenuProps {
  download: FileDownloadHook['download'];
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  undo: () => void;
  redo: () => void;
}

export default function ActionsMenu({
  download,
  handleFileUpload,
  undo,
  redo,
}: ActionsMenuProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Flex direction="col">
      <Button
        onClick={() =>
          download(`log-${new Date().toISOString().replaceAll(':', '-')}.json`)
        }
        alignText="left"
        icon="download"
      >
        Download
      </Button>
      <Button
        onClick={() => fileInputRef.current?.click()}
        alignText="left"
        icon="upload"
      >
        Upload
      </Button>
      <Button onClick={() => undo()} alignText="left" icon="undo">
        Undo
      </Button>
      <Button onClick={() => redo()} alignText="left" icon="redo">
        Redo
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
