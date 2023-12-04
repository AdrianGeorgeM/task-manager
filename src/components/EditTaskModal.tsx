import React, { useState } from 'react';
import { Task as TaskInterface } from '../interfaces/Task';
import styles from './EditTaskModal.module.css'; 
type EditTaskModalProps = {
  task: TaskInterface;
  onSave: (updatedTask: TaskInterface) => void;
  onCancel: () => void;
};

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(editedTask);
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleInputChange}
          placeholder="Edit Title"
        />
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleInputChange}
          placeholder="Edit Description"
        />
        <div className={styles.buttonContainer}>
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
          <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
