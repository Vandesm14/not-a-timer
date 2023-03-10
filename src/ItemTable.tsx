import { EditableText, HTMLTable } from '@blueprintjs/core';
import { Item } from './types';

interface ItemTableProps {
  items: Item[];
  removeItem: (id: string) => void;
  editItem: (id: string, note: string) => void;
}

export default function ItemTable({
  items,
  removeItem,
  editItem,
}: ItemTableProps) {
  return (
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
  );
}
