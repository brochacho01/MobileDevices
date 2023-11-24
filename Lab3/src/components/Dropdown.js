import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import UpArrow from './UpArrow';
import DownArrow from './DownArrow';
import { useMyBackgrounds } from '../hooks/useMyBackgrounds';

const DropdownComponent = ({Timezone, DayOfYear, DayOfWeek, WeekNum, setIsOpen, isOpen}) => {
  const { curBackground } = useMyBackgrounds();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // If all values are null, don't even show the dropdown button
  if (Timezone === null && DayOfYear === null && DayOfWeek === null && WeekNum === null) {
    return null;
  }
  
  return (
      <View style={[styles.container, { height: (isOpen ? 20 : 0) }]}>
      <TouchableOpacity onPress={handleToggle} style={[styles.dropdownButton, { backgroundColor: curBackground.dropdownBackground }]}>
        <Text style={[styles.dropdownText, { color: curBackground.dropDownTextColor}]}>{isOpen ? 'Less' : 'More'}</Text>
        {isOpen? <UpArrow /> : <DownArrow />}
      </TouchableOpacity>

      {/* If any of these values are not set, do not display them */}
      {isOpen && (
        <View style={[styles.dropdownContent, { backgroundColor: curBackground.dropdownBackground }]}>
          {Timezone !== null ? (
          <View style={styles.dropRow}>
            <Text style={[styles.contentText, { color: curBackground.dropDownTextColor }]}>Current Timezone:</Text>
            <Text style={[styles.dropFields, { marginLeft: 'auto', color: curBackground.dropDownTextColor }]}>{Timezone}</Text>
          </View>
          ) : null}
          {DayOfYear !== null ? (
          <View style={styles.dropRow}>
            <Text style={[styles.contentText, { color: curBackground.dropDownTextColor }]}>Day of the Year:</Text>
            <Text style={[styles.dropFields, { marginLeft: 'auto', color: curBackground.dropDownTextColor }]}>{DayOfYear}</Text>
          </View>
          ) : null}
          {DayOfWeek !== null ? (
          <View style={styles.dropRow}>
            <Text style={[styles.contentText, { color: curBackground.dropDownTextColor }]}>Day of the Week:</Text>
            <Text style={[styles.dropFields, { marginLeft: 'auto', color: curBackground.dropDownTextColor }]}>{DayOfWeek}</Text>
          </View>
          ) : null}
          {WeekNum !== null ? (
          <View style={styles.dropRow}>
            <Text style={[styles.contentText, { color: curBackground.dropDownTextColor }]}>Week Number:</Text>
            <Text style={[styles.dropFields, { marginLeft: 'auto', color: curBackground.dropDownTextColor }]}>{WeekNum}</Text>  
          </View>
          ) : null}
        </View>
      )}
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  dropdownButton: {
    flexDirection: 'row',
    padding: 10,
    marginLeft: 15,
    marginBottom: 15,
    // backgroundColor: '#e0e0e0',
    borderRadius: 35,
    width: 120,
  },
  dropRow: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: 10,
  },
  dropFields: {
    // textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
    marginLeft: 5,
    marginTop: 8,
  },
  dropdownContent: {
    // backgroundColor: '#A9A9A9',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    width: '100%',
  },
  contentText: {
    fontSize: 16,
  },
});

export default DropdownComponent;