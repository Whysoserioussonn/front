import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/useAuth"
import {HiHome} from "react-icons/hi"

const DashFooter = () => {

    const { username, status } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="text-yellow-300 text-4xl"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <HiHome />
            </button>
        )
    }

    const content = (
        <footer className="dash-footer">
            {goHomeButton}
            <p>Current User: {username}</p>
            <p>Status: {status}</p>
        </footer>
    )
    return content
}
export default DashFooter