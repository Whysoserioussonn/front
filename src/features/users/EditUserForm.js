import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"

import { ROLES } from "../../config/roles"
import {GiSave} from "react-icons/gi"
import {FaTrashAlt} from "react-icons/fa"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'border-2 border-red-500 outline-2 outline-cyan-500' : ''
    const validPwdClass = password && !validPassword ? 'border-2 border-red-500 outline-2 outline-cyan-500' : ''
    const validRolesClass = !Boolean(roles.length) ? 'border-2 border-red-500 outline-2 outline-cyan-500' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form class="flex flex-col flex-nowrap max-w-screen-md gap-3" onSubmit={e => e.preventDefault()}>
                <div class="flex justify-between items-center">
                    <h2>Edit User</h2>
                    <div class="gap-2 mr-2 flex justify-end items-center static">
                        <button
                            class="mt-2 text-4xl hover:scale-125 hover:text-blue-600 mr-2"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <GiSave />
                        </button>
                        <button
                            class="text-4xl hover:scale-125 hover:text-red-600"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>
                <label  htmlFor="username">
                    Username: <span class="whitespace-nowrap">[3-20 letters]</span></label>
                <input
                    className={`rounded-2xl p-2 text-black ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label  htmlFor="password">
                    Password: <span class="whitespace-nowrap">[empty = no change]</span> <span class="whitespace-nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`rounded-2xl p-2 text-black ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label class=" flex items-center w-fit gap-2" htmlFor="user-active">
                    ACTIVE:
                    <input
                        class="w-6 h-6"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>

                <label  htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`w-fit p-2 text-red-700 font-bold hover:bg-green-400 ${validRolesClass}`}                    
                    multiple="true"
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default EditUserForm