import { useNavigate } from 'react-router-dom'
import {FaEdit} from 'react-icons/fa'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? 'bg-green-700 text-white' : 'bg-red-700 text-yellow-300'

        return (
            <tr>
                <td class={`"bg-white p-2 border-2 broder-solid text-left ${cellStatus}`}>{user.username}</td>
                <td class={`"bg-white p-2 border-2 broder-solid text-left ${cellStatus}`}>{userRolesString}</td>
                <td class={`"bg-white p-2 border-2 broder-solid pl-24  ${cellStatus}`}>
                    <button
                        class=" w-48px h-48px text-4xl hover:scale-150 hover:text-blue-700 pl-6"
                        onClick={handleEdit}
                    >
                        <FaEdit />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default User