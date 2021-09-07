import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Switch } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { useTheme } from '../hooks/theme';

import logoImg from '../assets/images/logo/logo.png';

interface HeaderProps {
  tasksCounter: number;
}

export function Header({ tasksCounter }: HeaderProps) {
  const tasksCounterText = tasksCounter === 1 ? 'tarefa' : 'tarefas'

  const {themeName, theme, switchTheme} = useTheme();
  const [darkThemeOn, setDarkThemeOn] = useState(themeName === 'dark');

  function handleThemeSwitch() {
    const themeStringName = switchTheme();
    setDarkThemeOn(themeStringName === 'dark');
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      <Switch 
        thumbColor={theme.secondary}
        value={!darkThemeOn} 
        onChange={() => handleThemeSwitch()} />

      <Image source={logoImg} />
      
      <View style={styles.tasks}>
        <Text style={styles.tasksCounter}>Você tem </Text>
        <Text style={styles.tasksCounterBold}>{tasksCounter} {tasksCounterText}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(true) + 16,
    paddingHorizontal: 24,
    paddingBottom: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  tasks: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  tasksCounter: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Inter-Regular',
  },
  tasksCounterBold: {
    fontSize: 15,
    color: '#FFF',
    fontFamily: 'Inter-Bold',
  }
});