import { useState } from 'react'

const AddTask = ({ setShowTaskModal, tasks, setTasks, editingTask, setEditingTask }) => {

    const [formData, setFormData] = useState({
        title: editingTask ? editingTask.title : '',
        category: editingTask ? editingTask.category : 'Personal',
        priority: editingTask ? editingTask.priority : 'Medium'
    })

    const handleAddTask = (e) => {
        e.preventDefault();

        if(!formData.title.trim()){
            alert("Please enter a task title");
            return;
        }

        if (editingTask) {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === editingTask.id
                    ? { ...task, ...formData }
                    : task
            )
        );

        } else {
            const newTask = {
                id: Date.now(),
                ...formData
            };

            setTasks(prevTasks => [...prevTasks, newTask]);
        }

        setEditingTask(null);
        setShowTaskModal(false);
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md">

                <h2 className="text-2xl font-bold mb-6">
                    {editingTask ? 'Edit Task' : 'Create New Task'}
                </h2>

               
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={formData.title}
                    onChange={(e)=>setFormData({...formData,title: e.target.value})}
                    className="w-full border p-3 rounded-lg mb-4"                                                                            
                />

             
                <select value={formData.category} 
                onChange={(e)=>setFormData({...formData, category:e.target.value})}
                className="w-full border p-3 rounded-lg mb-4">
                    <option>Personal</option>
                    <option>Work</option>
                    <option>Projects</option>
                    <option>Learning</option>
                </select>

                
                <select value={formData.priority} 
                onChange={(e)=>setFormData({...formData, priority:e.target.value})}
                className="w-full border p-3 rounded-lg mb-6">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() =>{ setEditingTask(null);
                             setShowTaskModal(false);}}
                        className="px-4 py-2 rounded-lg bg-gray-200"
                    >
                        Cancel
                    </button>

                    <button  onClick={handleAddTask} className="px-4 py-2 rounded-lg bg-purple-700 text-white">
                        Add Task
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AddTask
