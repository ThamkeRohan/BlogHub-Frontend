import React, { useContext } from 'react'
import { UpdateAuthContext } from '../context/AuthContext'
export default function useUpdateAuthContext() {
    return useContext(UpdateAuthContext)
}
