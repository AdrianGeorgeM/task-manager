import React, { useState } from 'react';
import { Task as TaskInterface } from '../interfaces/Task';
import styles from './TaskForm.module.css';

type TaskFormProps = {
    addTask: (task: TaskInterface) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({ title: '', description: '' });

    const validateForm = () => {
        let isValid = true;
        let errors = { title: '', description: '' };

        if (!title.trim()) {
            errors.title = 'Title is required';
            isValid = false;
        } else if (title.length < 3 || title.length > 50) {
            errors.title = 'Title must be between 3 and 50 characters';
            isValid = false;
        }

        if (description.length > 200) {
            errors.description = 'Description must be less than 200 characters';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) return;

        addTask({ id: Date.now(), title, description, completed: false });
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <input
                type="text"
                className={styles.inputField}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            {errors.title && <div className={styles.error}>{errors.title}</div>}
            <textarea
                className={styles.textareaField}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            {errors.description && <div className={styles.error}>{errors.description}</div>}
            <button type="submit" className={styles.submitButton}>Add Task</button>
        </form>
    );
};

export default TaskForm;
