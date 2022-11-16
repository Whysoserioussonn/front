import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth"
import PacmanLoader from 'react-spinners/PacmanLoader'

const NotesList = () => {

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
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
        content = <p class="inline-block bg-white text-red-700 p-1 mb-2">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notes

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

        content = (
            <table className="table table--notes">
                <thead class="sticky top-0">
                    <tr>
                        <th scope="col" class="bg-amber-300 text-violet-700 text-left p-2 border-2 border-violet-400 font-bold">Repair Order</th>
                        <th scope="col" class="bg-amber-300 text-violet-700 text-left p-2 border-2 border-violet-400 font-bold">Created</th>
                        <th scope="col" class="bg-amber-300 text-violet-700 text-left p-2 border-2 border-violet-400 font-bold">Updated</th>
                        <th scope="col" class="bg-amber-300 text-violet-700 text-left p-2 border-2 border-violet-400 font-bold">>Location</th>
                        <th scope="col" class="bg-amber-300 text-violet-700 text-left p-2 border-2 border-violet-400 font-bold">Assigned to</th>
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
export default NotesList