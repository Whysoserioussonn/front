import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import {GiSave} from "react-icons/gi"

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "border-2 border-red-500 outline-2 outline-cyan-500" : ''
    const validTextClass = !text ? "border-2 border-red-500 outline-2 outline-cyan-500" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form class="flex flex-col flex-nowrap max-w-screen-md gap-3" onSubmit={onSaveNoteClicked}>
                <div class="flex justify-between items-center">
                    <h2>New Note</h2>
                    <div class="gap-2 mr-2 flex justify-end items-center static">
                        <button
                             class="mt-2 text-4xl hover:scale-125 hover:text-blue-600 mr-2"
                            title="Save"
                            disabled={!canSave}
                        >
                            < GiSave />
                        </button>
                    </div>
                </div>
                <label  htmlFor="title">
                    Location:</label>
                <input
                    className={`rounded-2xl p-2 text-black ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label  htmlFor="text">
                    Problem:</label>
                <textarea
                    className={`rounded-2xl p-2 text-black h-40 ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label class=" flex items-center w-fit gap-2" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    class="w-fit p-1 text-red-500"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}

export default NewNoteForm