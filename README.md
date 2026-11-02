# TaskFlow — Task Management Dashboard

> A responsive task management dashboard built with React and Tailwind CSS to practice React fundamentals, state management, reusable components, and browser storage.

## 1. Project Overview

**TaskFlow** is a task management application that allows users to organize their daily activities, track pending and completed tasks, and manage tasks through a simple dashboard.

This project was built as a hands-on learning project to strengthen my understanding of React and frontend development.

The main goal was to learn how React works in a practical environment rather than just studying concepts theoretically.

## 2. Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Building the user interface using reusable components |
| JavaScript (ES6+) | Application logic and functionality |
| Tailwind CSS | Styling and responsive layouts |
| React Router DOM | Client-side navigation |
| Lucide React | Icons and visual elements |
| Browser LocalStorage | Persisting tasks and completed-task data |

## 3. Features

### Dashboard
- Clean task management dashboard.
- Dynamic pending-task counter.
- Sidebar navigation.
- Organized dashboard layout.

### Task Management (CRUD)
- **Create:** Add new tasks using a modal form.
- **Read:** Display tasks dynamically.
- **Update:** Edit existing tasks.
- **Delete:** Remove tasks from the dashboard.

### Task Completion
- Mark tasks as completed.
- Undo task completion.
- Track completed tasks using their unique IDs.

### Search and Filtering
- Search tasks by title.
- Filter tasks by category:
  - All
  - Personal
  - Work
  - Projects
  - Learning
- Filter tasks by status:
  - All
  - Pending
  - Completed
- Combine search and filters.

### LocalStorage Persistence
- Save tasks in browser LocalStorage.
- Save completed-task IDs separately.
- Restore data after refreshing the browser.
- Use a reusable custom hook to manage storage logic.

## 4. Project Structure

```text
TaskFlow/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Card.jsx
│   │   ├── TodayTasks.jsx
│   │   └── AddTask.jsx
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── README.md
```

## 5. React Concepts Learned

This section is especially useful for revising React later.

### A. Components

React applications are divided into smaller reusable components.

Components used:
- Sidebar
- Dashboard
- Card
- TodayTasks
- AddTask

**Remember:** Components help separate responsibilities and make applications easier to maintain.

### B. Props

Props allow parent components to pass data and functions to child components.

Example:

```jsx
<Card
  tasks={tasks}
  completedTasks={completedTasks}
/>
```

Here, the parent passes task data to the Card component.

### C. useState()

Used to manage changing data in React.

States used in this project include:

```jsx
const [tasks, setTasks] = useState([]);
const [showTaskModal, setShowTaskModal] = useState(false);
const [editingTask, setEditingTask] = useState(null);
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');
const [selectedStatus, setSelectedStatus] = useState('All');
```

**Remember:**
- State stores changing information.
- Updating state triggers a re-render.
- Never directly modify state arrays or objects.

### D. useEffect()

Used to perform side effects in React.

Initially, this project used `useEffect()` to save task data into LocalStorage whenever the task state changed.

Example:

```jsx
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
```

**Remember the dependency array:**

| Syntax | Behaviour |
|---|---|
| `useEffect(() => {})` | Runs after every render |
| `useEffect(() => {}, [])` | Runs after the initial mount |
| `useEffect(() => {}, [count])` | Runs on mount and when count changes |

### E. CRUD Operations

CRUD stands for:

- Create
- Read
- Update
- Delete

Array methods used:

| Method | Purpose |
|---|---|
| `map()` | Update an existing task |
| `filter()` | Delete tasks and filter results |
| `includes()` | Check whether a task ID exists |
| Spread operator (`...`) | Create updated copies of arrays and objects |

Example — updating a task:

```jsx
setTasks(prev =>
  prev.map(task =>
    task.id === editingTask.id
      ? { ...task, ...formData }
      : task
  )
);
```

Example — deleting a task:

```jsx
setTasks(prev =>
  prev.filter(task => task.id !== id)
);
```

### F. Controlled Components

Used in the Add Task modal.

React state controls the input values.

Example:

```jsx
const [formData, setFormData] = useState({
  title: '',
  category: 'Personal',
  priority: 'Medium'
});
```

**Remember:** A controlled input gets its value from React state and updates that state through `onChange`.

### G. Conditional Rendering

Used to display the Add Task modal only when required.

```jsx
{showTaskModal && (
  <AddTask />
)}
```

**Remember:** `&&` can conditionally render a component based on a boolean condition.

### H. Custom Hooks

Created a reusable custom hook called `useLocalStorage`.

File: `hooks/useLocalStorage.js`

```jsx
import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {

  const [value, setValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    return savedValue !== null
      ? JSON.parse(savedValue)
      : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
```

Usage:

```jsx
const [tasks, setTasks] = useLocalStorage("tasks", []);
```

**Remember:**
- Custom hooks are JavaScript functions starting with `use`.
- They can use built-in React hooks.
- They allow stateful logic to be reused.
- Returning `[value, setValue]` makes the hook behave similarly to `useState()`.

### I. JSON.stringify() and JSON.parse()

LocalStorage stores data as strings.

**JSON.stringify():**

Converts JavaScript objects or arrays into JSON strings.

```jsx
JSON.stringify(tasks);
```

**JSON.parse():**

Converts JSON strings back into JavaScript objects or arrays.

```jsx
JSON.parse(savedTasks);
```

Remember:

```text
JavaScript Object → JSON.stringify() → JSON String

JSON String → JSON.parse() → JavaScript Object
```

### J. useMemo()

Used to cache the result of a calculation between renders.

Example:

```jsx
const filteredTasks = useMemo(() => {
  return tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [tasks, searchTerm]);
```

**Remember:** React recalculates the value when its dependencies change.

### K. useCallback()

Used to cache a function definition between renders.

Example:

```jsx
const handleClick = useCallback(() => {
  console.log("Button clicked");
}, []);
```

**Remember:** `useCallback()` caches a function, whereas `useMemo()` caches a calculated value.

### L. React.memo()

Used to memoize a component and potentially skip unnecessary re-renders when its props remain unchanged.

Example:

```jsx
export default React.memo(Sidebar);
```

**Remember:** React.memo performs a shallow comparison of props by default.

These optimization techniques should be used when they provide a real performance benefit, not automatically on every component.

## 6. LocalStorage Implementation

TaskFlow uses two LocalStorage keys:

| Key | Stored Data |
|---|---|
| `tasks` | Array of task objects |
| `completedTasks` | Array of completed task IDs |

Example task:

```javascript
{
  id: 1,
  title: "Complete React Dashboard",
  category: "Personal",
  priority: "High"
}
```

The custom `useLocalStorage` hook handles loading and saving these values.

This allows the application to retain task information even after the browser is refreshed.

**Note:** LocalStorage is browser-specific and is not a replacement for a backend database or cloud synchronization.

## 7. How to Run the Project

### Prerequisites

- Node.js installed.
- npm installed.
- VS Code or another code editor.

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd TaskFlow
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 8. Key Learning Outcomes

Through this project, I practised:

- Building component-based React applications.
- Passing data and functions through props.
- Managing application state with `useState`.
- Understanding side effects with `useEffect`.
- Implementing CRUD operations.
- Working with JavaScript array methods.
- Creating controlled forms.
- Implementing search and multiple filters.
- Persisting data using LocalStorage.
- Creating reusable custom hooks.
- Understanding React performance optimization.
- Organizing a React project into reusable components.

## 9. Future Improvements

Possible improvements for future versions:

- Backend integration with Node.js and Express.
- MongoDB database integration.
- User authentication and individual task accounts.
- Due dates and reminders.
- Drag-and-drop task organization.
- Dark and light themes.
- Better mobile responsiveness.
- Task sorting by priority and date.

These are future possibilities, not features currently implemented.

## 10. Important Revision Checklist

When revisiting this project, revise these topics in order:

- [ ] Components and JSX
- [ ] Props and component composition
- [ ] useState
- [ ] useEffect and dependency arrays
- [ ] Event handling
- [ ] Conditional rendering
- [ ] Controlled forms
- [ ] CRUD operations
- [ ] map(), filter(), includes()
- [ ] Spread operator
- [ ] LocalStorage
- [ ] JSON.stringify() and JSON.parse()
- [ ] Custom React Hooks
- [ ] useMemo
- [ ] useCallback
- [ ] React.memo

## 11. Project Philosophy

TaskFlow was built to understand React through practical implementation.

Instead of putting every possible technology into one application, the project focuses on strengthening core React concepts.

The next learning projects will explore Redux Toolkit for state management and GSAP for animations independently.

---

**Project:** TaskFlow — Task Management Dashboard  
**Category:** Frontend Development  
**Primary Technology:** React.js  
**Purpose:** Learning and practising React fundamentals through a practical project.
