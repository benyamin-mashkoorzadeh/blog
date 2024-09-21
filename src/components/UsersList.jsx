import {useDispatch, useSelector} from "react-redux";
import {selectAllUsers, useAddNewUserMutation, useDeleteUserMutation} from "../reducers/userSlice.js";
import {Link} from "react-router-dom";
import {useState} from "react";
import {nanoid} from "@reduxjs/toolkit";

const UsersList = () => {
    const [user, setUser] = useState('')
    const users = useSelector(selectAllUsers)
    const [addNewUser] = useAddNewUserMutation()
    const [deleteUser] = useDeleteUserMutation()
    const onUserChange = (e) => setUser(e.target.value)

    const canSave = Boolean(user)

    // console.log(addNewUser)
    const handleSubmitForm = async () => {
        if (canSave) {
            await addNewUser({id: nanoid(), fullname: user})
            setUser('')
        }
    }

    const handleDelete = async (userId) => {
        await deleteUser(userId)
    }

    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.fullname}</Link>
            &nbsp;
            <Link style={{marginRight: '10px', color: 'tomato'}} onClick={() => handleDelete(user.id)}>&otimes;</Link>
        </li>
    ))

    return (
        <section>
            <div>
                <form autoComplete="off">
                    <label htmlFor="user">نام نویسنده : </label>
                    <input type="text" name="user" id="user" value={user} onChange={onUserChange} />

                    <button type="button" onClick={handleSubmitForm} disabled={!canSave}>ساخت نویسنده جدید</button>
                </form>
            </div>
            <h2>لیست نویسندگان</h2>
            <ul>{renderedUsers}</ul>
        </section>
    )
}

export default UsersList;
