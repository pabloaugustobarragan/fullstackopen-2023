import axios from "axios";
import React from "react";

const Person = ({ persons, filter, handleDelete }) => {
    return (
        <>
            {
                persons &&
                persons.map((person) => {
                    if ( filter == '' || (person.name && person.name.toLowerCase().includes(filter.toLowerCase())))
                        return <div key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></div>
                    else return ''
                })
            }
        </>
    )
}

export default Person