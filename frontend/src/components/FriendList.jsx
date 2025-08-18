import React from 'react'

function FriendList({friends}) {
  return (
    <div>
        <h2>Friends</h2>
        <div>
            {
                friends.map((friend,idx) => (
                    <FriendCard 
                    key={idx}
                    name={friend.name}
                    status={friend.status}
                    onClick={() => console.log("Open Chat with",friend.name)}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default FriendList