import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { Task } from "./TasksList";

import trashIcon from '../assets/icons/trash/trash.png'

interface TaskItemProps {
    task: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTitle: string) => void;
  }

export function TaskItem({ task, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null)

  const handleStartEditing = (): void => {
    setEditing(true);
  };

  const handleCancelEditing = (): void => {
    setEditableTitle(task.title);
    setEditing(false);
  };

  const handleSubmitEditing = (id: number): void => {
    editTask(id, editableTitle);
    setEditing(false);
  };

  useEffect(() => {
    const { current } = textInputRef;
    if (current) {
      if (editing) {
        current.focus();
      } else {
        current.blur();
      }
    }
  }, [editing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => !editing && toggleTaskDone(task.id)}
        >
        
          <View 
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            style={task.done ? styles.taskTextDone : styles.taskText} 
            value={editableTitle}
            ref={textInputRef}
            onChangeText={setEditableTitle}
            editable={editing}
            onSubmitEditing={() => handleSubmitEditing(task.id)}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          testID={`edit-${index}`}
          style={styles.actionButton}
          onPress={() => setEditing(!editing)}
        >
          {
            !editing ? (
              <TouchableOpacity onPress={() => handleStartEditing()}>
                <Icon name="edit" size={18} color="#B2B2B2" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleCancelEditing()}>
                <Ionicon name="close" size={20} color="#B2B2B2" />
              </TouchableOpacity>
            )}
        </TouchableOpacity>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={[styles.actionButton, { opacity: editing ? 0.2 : 1 }]}
          onPress={() => removeTask(task.id)}
          disabled={editing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    actionButton: {
      paddingHorizontal: 20
    }
  })