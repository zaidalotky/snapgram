import React, { createContext, useContext, useEffect, useState } from 'react'
import { IUser } from '../types'
import { getCurrentUser } from '../lib/appwrite/api'
import {  useNavigate } from 'react-router-dom';

export const INTIAL_USER  = { 
   id: "",
   name: "",
   username: "",
   email: "",
   imageUrl: "",
   bio: "",
}
 
 const INTIAL_STATE = { 
  user: INTIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean
 }

 export type IContextType = {
  user: IUser,
  isLoading: boolean,
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  isAuthenticated: boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
  checkAuthUser: ()=> Promise<boolean>
};

 const AuthContext = createContext<IContextType>(INTIAL_STATE)

const AuthProvider = ({ children } : { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INTIAL_USER);
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();

      if(currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        })

        setIsAuthenticated(true);
        return true;
      }
      return false

    } catch (error) {
      console.log(error)
      return false
    } finally {
      setIsLoading(false)
    }
  };
  useEffect(() => {
    if ( 
      localStorage.getItem('cookieFallback') === '[]' ||
      localStorage.getItem('cookieFallback') === null
)
      navigate('/sign-in');
    checkAuthUser();
  }, [])

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }
  return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext);