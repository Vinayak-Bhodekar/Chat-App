import React, {useState} from 'react'

function EditProfile() {

  const [name, setName] = useState("User Name")
  const [bio, setBio] = useState("Thsi is the user Bio ...")
  return (
    <div className='p-6'>
      <h2
      className='text-xl font-semibold mb-4'
      >Edit Profile</h2>

      <form 
      className='space-y-4 max-w-md'>

        {/*Profile Picture */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Profile Picture</label>
          <input type="file" className='w-full border rounded-lg p-2' />
        </div>

        {/*Name */}
        <div>
          <label className='block text-sm font medium text-gray-700 mb-1'>Name</label>
          <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full border rounded-lg p-2 focus:ring-blue-400 focus: outline-none'/>
        </div>

        {/*Bio */}
        <div>
          <label className='block text-sm font medium text-gray-700 mb-1'>Bio</label>
          <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className='w-full border rounded-lg p-2 focus:ring-blue-400 focus: outline-none'
          rows="3"/>
        </div>

        <button 
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>Save changes</button>
      </form>
    </div>
  )
}

export default EditProfile