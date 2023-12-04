import React, { useState } from 'react';
import styles from './Task.module.css';
import { Task as TaskInterface } from '../interfaces/Task';
import EditTaskModal from './EditTaskModal';

type TaskProps = {
  task: TaskInterface;
  markAsCompleted: () => void;
  deleteTask: () => void;
  updateTask: (updatedTask: TaskInterface) => void;
};

const Task: React.FC<TaskProps> = ({ task, markAsCompleted, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedTask: TaskInterface) => {
    updateTask(updatedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.taskContainer}>
      <h3 className={`${styles.taskTitle} ${task.completed ? styles.completed : ''}`}>
        {task.title}
      </h3>
      <p className={`${styles.taskDescription} ${task.completed ? styles.completed : ''}`}>
        {task.description}
      </p>

      <div className={styles.taskActions}>
        {!task.completed && (
          <button className={`${styles.button} ${styles.completeButton}`} onClick={markAsCompleted}>
            Mark as Completed
          </button>
        )}

        {task.completed && (
          <div className={styles.completedLabel}>Completed</div>
        )}

        <button className={`${styles.button} ${styles.editButton}`} onClick={handleEditClick}>
          Edit
        </button>

        <button
          className={`${styles.button} ${styles.deleteButton}`}
          onClick={() => window.confirm('Are you sure you want to delete this task?') && deleteTask()}
        >
          Delete Task
        </button>
      </div>
      {isEditing && (
        <EditTaskModal task={task} onSave={handleSave} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default Task;
