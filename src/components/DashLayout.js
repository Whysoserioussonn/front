import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
    return (
        <>
            <DashHeader />
            <div className="pt-9 px-8 pb-8 grow">
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}
export default DashLayout