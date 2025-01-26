import React, { createContext, useState, useContext, useEffect } from 'react'

//Defines the User structure
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

//Defines the AuthContextType structure
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

//Creates the AuthContext
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => { },
  logout: () => { }
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // Provides the AuthContext to the children components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)