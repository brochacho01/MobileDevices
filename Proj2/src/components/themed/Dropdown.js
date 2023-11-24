import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown}>
        <Text>Open Dropdown</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={{ marginTop: 10 }}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectItem(item)}
              style={{ paddingVertical: 10, paddingHorizontal: 20 }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedItem && (
        <Text style={{ marginTop: 10 }}>
          Selected Item: {selectedItem}
        </Text>
      )}
    </View>
  );
};

export default DropdownMenu;