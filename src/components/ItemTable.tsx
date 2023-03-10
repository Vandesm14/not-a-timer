import { EditableText, HTMLTable } from '@blueprintjs/core';
import { Item } from '../types';
import ItemRow from './ItemRow';

interface ItemTableProps {
  items: Item[];
  removeItem: (id: string) => void;
  editItem: (id: string, partial: Partial<Item>) => void;
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
          <th>Timestamp</th>
          <th>Note</th>
          <th>Remove</th>
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
                <ItemRow
                  item={item}
                  removeItem={removeItem}
                  editItem={editItem}
                />
              ))
          : 'No items'}
      </tbody>
    </HTMLTable>
  );
}
