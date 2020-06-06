import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';

const styles = {
    width: '18rem',
    margin: '10px',

};

const pointerStyles={
    color: 'rgb(255,102,102)',
    cursor: 'pointer'
}

export function UserCard({ user,onDelete }) {
    const loggedUser = getLoggedUser();

    return (

        <div className="card text-white bg-dark mb-3" style={styles}>

            <div>
                <img className="card-img-top" src={user.picture} alt={user.name} />
                {loggedUser.isAdmin && <div><Link to={`/users/edit/${user.id}`}>Edit</Link></div>}
                <span className="delete-item">
                {loggedUser.isAdmin &&
                    <div className="cursor-pointer" onClick={()=>onDelete(user.id)} style={pointerStyles}>
                        Delete
                    </div>}
                </span>
            </div>
            <div className="card-body">
                <div className="info-holder">
                    <div className="card-link"><Link to={`/users/${user.id}`}>Name: {user.name}</Link></div>
                    <div className="age">Age: {user.age}</div>
                    <div className="email">Email: {user.email}</div>
                </div>
            </div>
            
        </div>


    )
}