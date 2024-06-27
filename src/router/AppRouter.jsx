import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

/**
 * handler of routes of the application
 */
export const AppRouter = () => {
    const {status, cheackAuthToken} = useAuthStore();
    //const authStatus = 'not-authenticated' // not-authenticated'; 

    useEffect(() => {
        cheackAuthToken(); 
    }, [])
    
  
    if (status === 'checking') {
        return (
            <div className="spinner-grow" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        )
    }

    return (
        <Routes>
            {
                (status === 'not-authenticated')
                    ? (
                    <>
                        <Route path="/auth/*" element={<LoginPage/>}/>
                        <Route path="/*" element={<Navigate to="/auth/login"/>}/>
                    </>
                    )
                    : 
                    <>
                        <Route path="/" element={<CalendarPage/>}/>
                        <Route path="/*" element={<Navigate to="/"/>}/>
                    </>
            }
        </Routes>
    )
}
