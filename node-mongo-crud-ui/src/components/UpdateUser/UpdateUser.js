import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data));
    }, []);

    const handleNameChange = e => {
        const updatedName = e.target.value;
        const updatedUser = {name: updatedName, email: user.email};
        setUser(updatedUser);
    }

    const handleEmailChange = e => {
        const updatedEmail = e.target.value;
        const updatedUser = {...user};
        updatedUser.email = updatedEmail;
        setUser(updatedUser);
    }

    const handleUserUpdate = e => {
        e.preventDefault();

        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                alert('Updated successfully');
                setUser({});
            }

            console.log(data)
        })

    }

    return (
        <div>
            <h2>Update: {user.name}</h2>
            <hr />
            <form onSubmit={handleUserUpdate}>
                <input type="text" onChange={handleNameChange} value={user.name || ''} /> <br />
                <input type="email" onChange={handleEmailChange} value={user.email || ''} /> <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;