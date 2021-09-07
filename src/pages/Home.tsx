import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { useTheme } from '../hooks/theme';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const {theme} = useTheme();
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle) {
      const taskAlredyExists = tasks.some((task) => task.title === newTaskTitle);
      if (taskAlredyExists) {
        Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
        return;
      }

      const newTask: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
  
      setTasks(oldState => [...oldState, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldTasks => {
      oldTasks.forEach((task) => {
        if (task.id === id) {
          task.done = !task.done;
        }
      });
      return [...oldTasks];
    });
  }

  function handleEditTask(id: number, newTitle: string) {
    setTasks(oldTasks => {
      oldTasks.forEach((task) => {
        if (task.id === id) {
          task.title = newTitle;
        }
      });
      
      return [...oldTasks];
    });
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover Item',
      'Tem certeza que você deseja remover este item?',
      [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          onPress: () => setTasks(oldState => oldState.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})