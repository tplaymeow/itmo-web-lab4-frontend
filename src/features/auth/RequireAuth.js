import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAccessToken, selectRefreshToken } from "./authSlice"

const RequireAuth = () => {
    const accessToken = useSelector(selectAccessToken)
    const refreshToken = useSelector(selectRefreshToken)

    const location = useLocation()

    return (
        accessToken && refreshToken
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth