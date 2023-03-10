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
      label={date}
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
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  const handleChange = (date: string) => {
    onChange(date);
    setSelectedDate(date);
  };

  const handleClear = () => {
    onChange(null);
    setSelectedDate(null);
  };

  return (
    <Flex>
      <Select2
        items={dates}
        itemRenderer={renderItem}
        onItemSelect={handleChange}
      >
        <Button
          text={selectedDate ?? 'Filter by date'}
          rightIcon="double-caret-vertical"
        />
      </Select2>
      <Button icon="cross" minimal onClick={() => handleClear()} />
    </Flex>
  );
}
