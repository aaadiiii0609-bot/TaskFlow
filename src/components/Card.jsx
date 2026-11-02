

const Card = ({tasks,completedTasks}) => {

    const totalTasks = tasks.length;
    const completed = completedTasks.length;
    const inProgress = totalTasks - completed;

    const taskStats = [
        {id:1, title:'Total Tasks', count: totalTasks, description:'All your tasks', color:'#BF90F9',textColor:'#35066F'},
        {id:2, title:'Completed', count: completed, description:'Tasks Finished', color:'#94F990', textColor:'#0A6F06'},
        {id:3, title:'In Progress', count: inProgress, description:'Currently Working', color:'#F9DB90', textColor:'#6F5106'},
        {id:4, title:'Overdue', count:0, description:'Past due date', color:'#F9A090', textColor:'#6F1606'},
    ]




  return (
    <div className='grid grid-cols-4 gap-5 p-5 mb-2 mt-4 rounded-2xl shadow-sm '>
        {taskStats.map((taskStats) => (
            <div key={taskStats.id} style={{ backgroundColor: taskStats.color , color: taskStats.textColor}} className='p-5 rounded-2xl'>
                <h2>{taskStats.title}</h2>
                <p className='font-bold text-3xl'>{taskStats.count}</p>
                <h3>{taskStats.description}</h3>
            </div>
        ))}
    </div>
  )
}

export default Card