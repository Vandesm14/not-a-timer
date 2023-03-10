import { createRoot } from 'react-dom/client';
import * as React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { Button } from '@blueprintjs/core';
import useFileDownload from './hooks/useFileDownload';
import Flex from './compose/Flex';
import ItemTable from './components/ItemTable';
import { Item } from './types';
import { uuid } from './uuid';
import ItemInput from './components/ItemInput';
import DateSelector from './components/DateSelector';
import { Popover2 } from '@blueprintjs/popover2';
import ActionsMenu from './components/ActionsMenu';

const dateToDMY = (date: Date) => {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return d + '/' + m + '/' + y;
};

export default function App() {
  const [items, setItems] = useLocalStorageState<Item[]>('items', {
    defaultValue: [],
  });
  const { setValue, download } = useFileDownload();
  const [dateFilter, setDateFilter] = React.useState<string | null>(null);
  const filteredItems = React.useMemo(() => {
    if (dateFilter) {
      return items.filter(
        (item) => dateToDMY(new Date(item.ts)) === dateFilter
      );
    }
    return items;
  }, [items, dateFilter]);

  const allDates = React.useMemo(() => {
    return items
      .slice()
      .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
      .map((item) => dateToDMY(new Date(item.ts)))
      .filter((v, i, a) => a.indexOf(v) === i);
  }, [items]);

  const addItem = (item: Item) => {
    setItems((items) => [...items, item]);
  };

  const removeItem = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const editItem = (id: string, partial: Partial<Item>) => {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, ...partial } : item))
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
    // Backwards compatability, ensure that all items have an id
    if (items.length > 0 && items.some((item) => !item.id)) {
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
      <Flex css={{ gap: '8px', padding: '8px' }}>
        <Popover2
          content={
            <ActionsMenu
              download={download}
              handleFileUpload={handleFileUpload}
            />
          }
          interactionKind="hover"
        >
          <Button icon="menu" />
        </Popover2>
        <DateSelector dates={allDates} onChange={setDateFilter} />
      </Flex>
      <ItemTable
        items={filteredItems}
        removeItem={removeItem}
        editItem={editItem}
      />
    </Flex>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
