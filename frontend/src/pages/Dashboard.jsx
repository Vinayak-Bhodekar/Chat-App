import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import ProfileCard from '../components/ProfileCard'
import EditProfile from '../components/EditProfile'
function Dashboard() {

    const [showEdit, setShowEdit] = useState(false)
  return (
    <div className='flex h-screen bg-gray-600'>

      {/*Sidebar*/}
      <div className='w-1/4 bg-gray-300 border-r border-gray-900 flex flex-col p-4'>

        {/*Profile Section*/}
        <ProfileCard onEdit={() => setShowEdit(true)}/>

        {/*Chats & groups */}
        <div className='flex-1 overflow-y-auto p-4 rounded-xl bg-white m-4'>
          <h2 className='text-gray-600 text-sm font-semibold mb-2'>chats & groups</h2>
          <div className='space-y-2'>

          </div>
        </div>
        

        {/*Saved and others */}
        <div className='flex-none p-4 border-t border-gray-200 rounded-xl bg-white m-4'>
          <div>saved</div>
          <div>Add friend</div>
          <div></div>
        </div>

        {/*Setting */}
        <div className='flex-none p-4 border-t border-gray-200 rounded-xl bg-white m-4'>
          <div className='w-full text-left p-2 rounded-md hover:bg-gray-100'>setting</div>
        </div>
      </div>

      {/*Main*/}
      <div className='flex flex-1 flex-col'>
        {/*Message Header*/}

        {showEdit ? (
          <EditProfile />
        ):(
          <>
            <div className='p-4 bg-white border-b border-gray-300 flex items-center w-full justify-between'>

              {/*left side */}
              <div className='flex items-center space-x-3'>
                <img src="" alt="" className='h-10 w-10 rounded-full bg-gray-300'/>
                <div>
                  <div className='font-semibold'>Name</div>
                  <div className='text-gray-600 text-sm'>Status Online Or Last seen</div>
                </div>
              </div>

              {/*Right side*/}
              <div className='flex space-x-4'>
                <div className=''>notification ON/OFF</div>
                <div className=''>Chat setting</div>
              </div>
            </div>

            { /*MEssages Area*/ }
            <div className='flex-1 p-4 overflow-y-auto space-y-4 bg-gray-200'> 
              {/*Receiver side*/}
              <div className='flex justify-start'>
                <div className='bg-white p-2 rounded-sm'>receiver messages</div>
              </div>
              <div className='flex justify-end'>
                <div className='bg-white p-2 rounded-sm'>sender messages</div>
              </div> 
            </div>

            {/*Message Input*/}
            <div className='p-4 bg-white border-t border-gray-300 flex items-center space-x-3'>
                <input type="text"
                placeholder='Type a message...'
                className='flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400'/>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>Send</button>
            </div>
          </>
        )}
        
      </div>
    </div>
  )
}

export default Dashboard