import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Card from './components/Card'
import TodayTasks from './components/TodayTasks'
import AddTask from './components/Addtask'
import useLocalStorage from './hooks/useLocalStorage'
import { useState } from 'react'

const App = () => {

   const [completedTasks, setCompletedTasks] = useLocalStorage("completedTasks", []);

   const [showTaskModal, setShowTaskModal] = useState(false);
   const [editingTask, setEditingTask] = useState(null)
   const [searchTerm, setSearchTerm] = useState('')
   const [selectedCategory, setSelectedCategory] = useState('All')
   const [selectedStatus, setSelectedStatus] = useState('All')

   const [tasks, setTasks] = useLocalStorage("tasks", [
        { id: 1, title: 'Complete React Dashboard', category: 'Personal', priority: 'High' },
        { id: 2, title: 'Revise javascript Hooks', category: 'Work', priority: 'Medium' },
        { id: 3, title: 'Design Taskflow UI', category: 'Projects', priority: 'High' },
        { id: 4, title: 'Read Documentation', category: 'Personal', priority: 'Low' },
      ]);
   


  return (
    <div className='flex bg-gray-100 min-h-screen'>
      <Sidebar/>
       <main className="flex-1 p-8">
        <Dashboard setShowTaskModal={setShowTaskModal} tasks={tasks} completedTasks={completedTasks}/>
        <Card tasks={tasks} completedTasks={completedTasks} />
        <TodayTasks
          tasks={tasks}
          setTasks={setTasks}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          setShowTaskModal={setShowTaskModal}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

       </main>
       {showTaskModal && (
            <AddTask
                setShowTaskModal={setShowTaskModal}
                tasks={tasks}
                setTasks={setTasks}
                editingTask={editingTask}
                setEditingTask={setEditingTask}
            />
        )}
    </div>
  )
}

export default App