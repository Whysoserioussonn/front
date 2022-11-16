import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import PacmanLoader from 'react-spinners/PacmanLoader'

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PacmanLoader color="#ed043a"
    loading
    size={49}
    speedMultiplier={-6}
  />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length && ids.map(userId => <User key={userId} userId={userId} />)

        content = (
            <table className="table table--users">
                <thead class="sticky top-0">
                    <tr>
                        <th scope="col" class="bg-amber-300 text-violet-700 text-left p-2 border-2 border-violet-400 font-bold">Username</th>
                        <th scope="col" class="bg-amber-300 text-violet-700 text-left p-2 border-2 border-violet-400 font-bold">Roles</th>
                        <th scope="col" class="bg-amber-300 text-violet-700 text-left p-2 border-2 border-violet-400 font-bold">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default UsersList