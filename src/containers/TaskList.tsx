import { useState, useCallback } from 'react';
import TaskForm from '../components/TaskForm';
import Task from '../components/Task';
import { Task as TaskInterface } from '../interfaces/Task';
import styles from '../containers/TaskList.module.css';

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  const addTask = useCallback((newTask: TaskInterface) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  const markTaskAsCompleted = useCallback((id: number) => {
    setTasks(prevTasks => prevTasks.map(task => task.id === id ? { ...task, completed: true } : task));
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const updateTask = useCallback((updatedTask: TaskInterface) => {
    setTasks(prevTasks => {
      const taskIndex = prevTasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        const updatedTasks = [...prevTasks];
        updatedTasks[taskIndex] = updatedTask;
        return updatedTasks;
      }
      return prevTasks;
    });
  }, []);

  const renderTasks = () => {
    if (tasks.length === 0) {
      return <p>No tasks available</p>;
    }
    return tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        markAsCompleted={() => markTaskAsCompleted(task.id)}
        deleteTask={() => deleteTask(task.id)}
        updateTask={updateTask}
      />
    ));
  };

  return (
    <div className={styles.listContainer}>
      <TaskForm addTask={addTask} />
      {renderTasks()}
    </div>
  );
};

export default TaskList;
