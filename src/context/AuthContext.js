import React, { useEffect, useState } from 'react'
import usersFormDb from '../data/users'

export const AuthContext = React.createContext()
export const UpdateAuthContext = React.createContext()

export default function AuthProvider({ children }){
    const [user, setUser] = useState(null)
    useEffect(() => {
        // fetch user data corresponding to email
        // setUser(userFetchedFromDB)
        
    },[])

    function addUser(user){
        setUser(user)
    }

    function removeUser(){
        setUser(null)
    }

    return (
        <AuthContext.Provider value={user}>
            <UpdateAuthContext.Provider value={{addUser, removeUser}}>
                { children }
            </UpdateAuthContext.Provider>
        </AuthContext.Provider>
    )
}