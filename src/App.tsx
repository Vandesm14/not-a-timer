import { createRoot } from 'react-dom/client';
import * as React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { InputGroup, HTMLTable, EditableText, Button } from '@blueprintjs/core';
import useFileDownload from './hooks/useFileDownload';
import { Flex } from './compose/Flex';

type Item = {
  id: string;
  ts: Date;
  note: string;
  project?: string;
};

const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

export default function App() {
  const [items, setItems] = useLocalStorageState<Item[]>('items', {
    defaultValue: [],
  });
  const [note, setNote] = React.useState('');
  const dates = React.useMemo(() => {
    return items.reduce<string[]>((acc, item) => {
      if (!acc.includes(new Date(item.ts).toLocaleDateString())) {
        acc.push(new Date(item.ts).toLocaleDateString());
      }
      return acc;
    }, []);
  }, [items]);
  const { setValue, download } = useFileDownload();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      const item = {
        id: uuid(),
        ts: new Date(),
        note,
      };

      setItems((items) => [...items, item]);
      setNote('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  const removeItem = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const editItem = (id: string, note: string) => {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, note } : item))
    );
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
      <InputGroup
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={note}
      />
      <section>
        <Button onClick={() => download()}>Download</Button>
      </section>
      <HTMLTable>
        <thead>
          <tr>
            <th>ts</th>
            <th>note</th>
            <th>project</th>
            <th>ctrl</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0
            ? items
                .slice()
                .sort(
                  (a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime()
                )
                .map((item) => (
                  <tr key={item.id}>
                    <td>{new Date(item.ts).toLocaleString()}</td>
                    <td>
                      <EditableText
                        defaultValue={item.note}
                        onChange={(note) => editItem(item.id, note)}
                        selectAllOnFocus
                        confirmOnEnterKey
                      />
                    </td>
                    <td>{item.project}</td>
                    <td>
                      <button onClick={() => removeItem(item.id)}>X</button>
                    </td>
                  </tr>
                ))
            : 'No items'}
        </tbody>
      </HTMLTable>
    </Flex>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
