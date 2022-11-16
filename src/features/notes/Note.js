import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'
import {FaEdit} from "react-icons/fa"

const Note = ({ noteId }) => {

    const note = useSelector(state => selectNoteById(state, noteId))

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr >
                <td class="bg-white p-2 border-2 broder-solid text-left font-bold ">
                    {note.completed
                        ? <span class="text-green-500">Completed</span>
                        : <span class="text-red-500">Open</span>
                    }
                </td>
                <td class="bg-white p-2 border-2 broder-solid text-left block">{created}</td>
                <td class="bg-white p-2 border-2 broder-solid text-left block">{updated}</td>
                <td class="bg-white p-2 border-2 broder-solid text-left ">{note.title}</td>
                <td class="bg-white p-2 border-2 broder-solid text-left block">{note.username}</td>

                <td class="bg-white p-2 border-2 broder-solid text-left">
                    <button
                        class="text-4xl text-violet-700 hover:scale-150 hover:text-red-700 pl-12 pt-4"
                        onClick={handleEdit}
                    >
                        <FaEdit/>
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Note