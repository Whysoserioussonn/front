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
                className="text-red-500 text-2xl scale-125 hover:text-white "
                title="Home"
                onClick={onGoHomeClicked}
            >
                <HiHome />
            </button>
        )
    }

    const content = (
        <footer className=" flex flex-row flex-nowrap text-base text-violet-600 sticky bottom-0 bg-amber-400 p-2 border-t-4  border-red-600 gap-4 ">
            {goHomeButton}
            <p class = "bg-blue-500 text-white">Current User: {username}</p>
            <p class = "bg-blue-500 text-white">Status: {status}</p>
        </footer>
    )
    return content
}
export default DashFooter