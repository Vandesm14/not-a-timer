import { Button, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, Select2 } from '@blueprintjs/select';
import React from 'react';
import Flex from './compose/Flex';

const renderItem: ItemRenderer<string> = (
  date,
  { handleClick, handleFocus, modifiers }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={date}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={date}
    />
  );
};

interface DateSelectorProps {
  dates: string[];
  onChange: (date: string | null) => void;
}

export default function DateSelector({ dates, onChange }: DateSelectorProps) {
  const [selectedDate, setSelectedDate] = React.useState<string>('All');

  const items = React.useMemo(() => {
    return ['All', ...dates];
  }, [dates]);

  const handleChange = (date: string) => {
    if (date === 'All') {
      handleClear();
      return;
    }

    onChange(date);
    setSelectedDate(date);
  };

  const handleClear = () => {
    onChange(null);
    setSelectedDate('All');
  };

  return (
    <Flex>
      <Select2
        items={items}
        itemRenderer={renderItem}
        onItemSelect={handleChange}
      >
        <Button
          text={selectedDate ?? 'Filter by date'}
          rightIcon="double-caret-vertical"
        />
      </Select2>
    </Flex>
  );
}
