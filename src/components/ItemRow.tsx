import { EditableText } from '@blueprintjs/core';
import { Item } from '../types';

interface ItemRowProps {
  item: Item;
  editItem: (id: string, item: Partial<Item>) => void;
  removeItem: (id: string) => void;
}

export default function ItemRow({ item, editItem, removeItem }: ItemRowProps) {
  return (
    <tr key={item.id}>
      <td>
        <EditableText
          defaultValue={new Date(item.ts).toLocaleString()}
          onConfirm={(date) => editItem(item.id, { ts: new Date(date) })}
          selectAllOnFocus
          confirmOnEnterKey
        />
      </td>
      <td>
        <EditableText
          defaultValue={item.note}
          onConfirm={(note) => editItem(item.id, { note })}
          selectAllOnFocus
          confirmOnEnterKey
        />
      </td>
      <td>
        <button onClick={() => removeItem(item.id)}>X</button>
      </td>
    </tr>
  );
}
