import React from 'react'
import { Link,NavLink } from 'react-router-dom'  
import { LayoutDashboard, ListChecks, CalendarDays, Settings, CircleQuestionMark} from 'lucide-react'

const Sidebar = () => {

    const categories = [
    {id:1, name: 'Personal', color:'#6488F5'},
    {id: 2, name: 'Work', color: '#35B98A'},
    {id: 3, name: 'Projects', color: '#E9A64B'}
  ]

  return (
    <div className='bg-[#242033] h-[calc(100vh-40px)] w-64 m-5 shrink-0 mb-4 rounded-4xl flex flex-col'>
        <Link to="/" className='text-white p-5 flex items-center gap-3'>
          <h1 className='text-2xl mt-5 mx-5'>TaskFlow</h1>
        </Link>
        <div className='m-5 p-5'>
          <h2 className='text-white mb-5'>Menu</h2>


          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 mb-3 rounded-xl transition-all duration-200
              ${isActive ? 'bg-purple-600 text-white' : 'text-white hover:bg-gray-700'}`
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 mb-3 rounded-xl transition-all duration-200
              ${isActive ? 'bg-purple-600 text-white' : 'text-white hover:bg-gray-700'}`
            }
          >
            <ListChecks size={20} />
            <span>My Tasks</span>
          </NavLink>

          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 mb-3 rounded-xl transition-all duration-200
              ${isActive ? 'bg-purple-600 text-white' : 'text-white hover:bg-gray-700'}`
            }
          >
            <CalendarDays size={20} />
            <span>Calendar</span>
          </NavLink>
        </div>

        {/* Categories */}

        <div className='m-5 p-5 text-white mb-4'>
          <h2 className="text-white mb-5">Categories</h2>
          {categories.map((category)=> (
            <div key={category.id}  className='flex items-center gap-3 text-sm mb-3'>
              <span className="w-3 h-3 rounded-full block"
              style={{ backgroundColor: category.color }}></span>
              <span>{category.name}</span>
            </div>
          ))}
        </div>

        {/* footer */}

        <div className='m-5 p-5 mt-auto mb-4'>
          <div className='flex items-center text-white mb-5 gap-3'>
            <Settings color="#ffffff" />
            <h3>Settings</h3>
          </div>
          <div className='flex items-center text-white mb-5 gap-3'>
            <CircleQuestionMark color="#ffffff" />
            <h3>Help & Support</h3>
          </div>
          <hr className="my-4 border-gray-300"/>
          <div className='flex items-center gap-5'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSreWyywtP-Mdcp1ksEnlkbZSkycDEv_zr-e16yxrGeSlV5nD_3Mqhv5rY&s=10" className='rounded-4xl h-15 w-15 ' alt="not working" />
            <div>
              <h2 className='font-bold text-white'>Aditya</h2>
              <h3 className='text-gray-500'>Free Plan</h3>
            </div>
          </div>

        </div>

      </div>

  )
}

export default React.memo(Sidebar);