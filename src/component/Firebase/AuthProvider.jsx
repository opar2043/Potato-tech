import React, { createContext } from 'react'
export const AuthContext = createContext()
const AuthProvider = ({children}) => {
     const name = 'opar'
     const obj = {
            name
     }

     
     return <AuthContext.Provider value={obj}>
                {children}
     </AuthContext.Provider>
}

export default AuthProvider