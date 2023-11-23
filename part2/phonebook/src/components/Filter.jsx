import React from "react"

const Filter = ({setFilter}) => {
    return <>
        filter shown with <input onChange={(e) => setFilter(e.target.value)}/>
    </>
}

export default Filter