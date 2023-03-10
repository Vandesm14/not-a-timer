import { createRoot } from 'react-dom/client';
import * as React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Button, FileInput } from '@blueprintjs/core';
import useFileDownload from './hooks/useFileDownload';
import Flex from './compose/Flex';
import ItemTable from './ItemTable';
import { Item } from './types';
import { uuid } from './uuid';
import ItemInput from './ItemInput';

export default function App() {
  const [items, setItems] = useLocalStorageState<Item[]>('items', {
    defaultValue: [],
  });
  const { setValue, download } = useFileDownload('items.json');

  const addItem = (item: Item) => {
    setItems((items) => [...items, item]);
  };

  const removeItem = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const editItem = (id: string, note: string) => {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, note } : item))
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const items = JSON.parse(e.target?.result as string);
        setItems(items);
      };
      reader.readAsText(file);
    }
  };

  React.useEffect(() => {
    if (items.length > 0 && items.some((item) => !item.id)) {
      // Backwards compatability, ensure that all items have an id
      setItems(
        items.map((item) => (!item.id ? { ...item, id: uuid() } : item))
      );
    }
  }, []);

  React.useEffect(() => {
    setValue(JSON.stringify(items));
  }, [items]);

  return (
    <Flex direction="col" css={{ width: 'max-content' }}>
      <ItemInput onConfirm={addItem} />
      <Flex>
        <Button onClick={() => download()}>Download</Button>
        <FileInput onInputChange={handleFileUpload} />
      </Flex>
      <ItemTable items={items} removeItem={removeItem} editItem={editItem} />
    </Flex>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
