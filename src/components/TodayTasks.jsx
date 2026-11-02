import { CircleCheck , Circle, Trash, SquarePen} from 'lucide-react'
import { useMemo } from 'react';




const TodayTasks = ({tasks,setTasks,completedTasks,setCompletedTasks,setEditingTask,setShowTaskModal,searchTerm,setSearchTerm,selectedCategory,setSelectedCategory,selectedStatus,setSelectedStatus}) => {


    const Completed = (id) => {
        if(completedTasks.includes(id)){
            setCompletedTasks(completedTasks.filter(taskId => taskId !== id));
        }else{
            setCompletedTasks([...completedTasks, id]);
        }
    }

    const DeleteTask = (id) => {
        const updateTasks = tasks.filter(task => task.id != id);
        setTasks(updateTasks);

        setCompletedTasks(prev => prev.filter(taskId => taskId !== id));
    }

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowTaskModal(true);
    };


    const filteredTasks = useMemo(() => {
    
        return tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;

        const matchesStatus = selectedStatus === 'All' || (selectedStatus === 'Completed' && completedTasks.includes(task.id)) || (selectedStatus === 'Pending' && !completedTasks.includes(task.id));

        return matchesSearch && matchesCategory && matchesStatus;
    });
    },[tasks,searchTerm,selectedCategory,selectedStatus,completedTasks]);

  return (
    <div>

        <input
            type='text'
            placeholder='Search Tasks....'
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className='w-full p-3 mb-5 mt-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-300'  
        />
        {filteredTasks.length === 0 && (
            <p className="text-center text-gray-500 py-5">
                No tasks found.
            </p>
        )}

        <div className=''>
            {['All', 'Personal', 'Work', 'Projects', 'Learning'].map(category => (
                <button
                    key={category}
                    onClick={()=>setSelectedCategory(category)}
                    className={`px-4 py-2 mb-5 mx-3 rounded-xl transition-all ${
                        selectedCategory == category
                            ? 'bg-purple-700 text-white'
                            : ' bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {category}
                </button>
            ))}
            {['All','Pending','Completed'].map(status=>(
                <button
                    key={status}
                    onClick={()=>setSelectedStatus(status)}
                    className={`px-4 py-2 mb-5 mx-3 rounded-xl transition-all ${
                        selectedStatus === status
                            ? 'bg-purple-700 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {status}
                </button>
            ))}
        </div>

        {filteredTasks.map((task) => {
            let color;

            if (task.priority === "High") {
                color = "#F9A090";
            } else if (task.priority === "Medium") {
                color = "#F9CA90";
            } else {
                color = "#90F9E2";
            }


            return (
                <div key={task.id} className="flex items-center justify-between gap-5 mb-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:bg-gray-100 transition-all duration-200">
                    <div className='flex gap-5'>
                    <button onClick={() => Completed(task.id)} className="cursor-pointer">
                        {completedTasks.includes(task.id)?(
                            <CircleCheck color="green" size={24} />
                        ):(
                            <Circle color="gray" size={24} />
                        )}
                    </button>
                    <div>
                    <h1 className={`text-gray-800 font-semibold ${completedTasks.includes(task.id)? 'line-through text-gray-400': ''}`}>
                        {task.title}</h1>

                      <p>{task.category}</p>
                    </div>
                    </div>
                    <div className='flex gap-3'>
                    <h2 style={{ backgroundColor: color }} className='px-3 py-1 rounded-xl'>
                        {task.priority}
                    </h2>
                    <button onClick={()=>handleEdit(task)} className='cursor-pointer shadow-sm p-2 border-gray-800 rounded-xl'>
                         <SquarePen size={18} color="blue" />
                    </button>
                    <button onClick={()=> DeleteTask(task.id)} className='cursor-pointer shadow-sm p-2 border-gray-800 rounded-xl'>
                         <Trash color="#C60F0C" size={20}  />
                    </button>
                    </div>
                </div>
            );
        })}
    </div>
  )
}

export default TodayTasks