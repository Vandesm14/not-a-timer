import { InputGroup } from '@blueprintjs/core';
import React from 'react';
import { Item } from './types';
import { uuid } from './uuid';

export interface ItemInputProps {
  onConfirm: (item: Item) => void;
}

export default function ItemInput({ onConfirm }: ItemInputProps) {
  const [note, setNote] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const item: Item = {
        id: uuid(),
        ts: new Date(),
        note,
      };

      onConfirm(item);
      setNote('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  return (
    <InputGroup
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      value={note}
    />
  );
}
