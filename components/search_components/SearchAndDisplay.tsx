"use client"

import React from 'react'
import { useState } from 'react'
import UserCard from '../cards/UserCard'
import { fetchUsers } from '@/lib/actions/user.actions'

interface Props{
  userId: string,
  response: {users : any[], isNext: boolean}
}

const SearchAndDisplay = ({
  userId,
  response
} : Props) => {
  const [users, setUsers] = useState(response)

  const searchHandler = async () => {
    const search = document.querySelector('input[type="text"]') as HTMLInputElement;
    const searchValue = search.value.toLowerCase().trim();

    if (searchValue === '') {
      setUsers(response);
      return;
    }
  
    const filteredUsers = await fetchUsers({
      userId,
      searchString: searchValue
    })
  
    setUsers(filteredUsers);
  };  

  return (
    <>
      <label className="input input-bordered flex items-center gap-2 text-neutral-500" onChange={searchHandler}>
        <input type="text" className="grow placeholder-neutral-500" placeholder="Search"/>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
      </label>
      <div className="mt-14 flex flex-col gap-9">
      {users.users && users.users.length === 0 ? (
        <p className='no-result'>No Users</p>
      ) : (
        <>
          {users.users.map((user) => (
            <UserCard 
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              imageUrl={user.image}
              userType={'User'}
            />
          ))}
        </>
      )}
    </div>
    </>
  )
}

export default SearchAndDisplay