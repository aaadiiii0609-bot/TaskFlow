import { Bell } from 'lucide-react';


const Dashboard = ({setShowTaskModal,tasks,completedTasks}) => {

    const totalTasks = tasks.length;
    const completed = completedTasks.length;
    const inProgress = totalTasks - completed;

    const today = new Date();

    const formattedDate = today.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const currentHours = new Date().getHours();
    let greeting; 

    if(currentHours<12 && currentHours>5){
        greeting = 'Good Morning';
    }
    else if(currentHours<17 && currentHours>12){
        greeting = 'Good Afternoon'
    }
    else{
        greeting = 'Good Evening';
    }

  return (
    <div>
        {/* Header */}
        <div className='flex justify-between items-center'>
            <div>
            <h1 className='text-3xl font-bold text-gray-800'>{greeting}, Aditya...</h1>
            <p className='text-gray-500 mt-4'>Here's what's happening with your tasks today.</p>
            <p className='text-gray-500 mt-1'>Your {inProgress} tasks are pending....</p>
            </div>
            <div className='flex gap-5'>
            <p className='text-sm text-gray-500'>{formattedDate}</p>
            <Bell color="#000000" />
            <button onClick={() => setShowTaskModal(true)} className='bg-[#242033] text-white py-1 px-4 rounded-xl hover:bg-gray-700'>Add Task</button>
            </div>
        </div>
    </div>
  )
}

export default Dashboard