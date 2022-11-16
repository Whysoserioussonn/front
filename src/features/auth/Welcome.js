import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const { username, isManager, isAdmin } = useAuth()
   
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section>

            <p>{today}</p>

            <h1 class="my-2 font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-white
             to-pink-600">Welcome {username}!</h1>

            <Link to="/dash/notes"><p class="my-4 text-amber-300 hover:text-green-300 hover:border-4 w-60" >View Repair Notes</p></Link>

            <Link to="/dash/notes/new"><p class="my-4 text-amber-300 hover:text-green-300 hover:border-4 w-60">Add New Repair Note</p></Link>

            {(isManager || isAdmin) && <Link to="/dash/users"><p class="my-4 text-amber-300 hover:text-green-300 hover:border-4 w-60">View List of Employees</p></Link>}

            {(isManager || isAdmin) && <Link to="/dash/users/new"><p class="my-4 text-amber-300 hover:text-green-300 hover:border-4 w-60">Add New User</p></Link>}
            

        </section>
    )

    return content
}
export default Welcome