import React from "react"



const Header = ({ course }) => {
    return <h1>{course.name}</h1>
}

const Content = ({ data }) => {
    return <>
        {
            data.map((element, i) => {
                return <Part key={i} part={element.name} exercises={element.exercises} />
            })
        }
    </>
}

const Part = ({ part, exercises }) => {
    return <p>{part} {exercises}</p>
}

const Total = ({ exercises }) => {
    const total = exercises.reduce((sum, a) => sum + a.exercises, 0);
    return <b>Total of {total} exercises</b>;
}

const Course = ({ course }) => {

    return (
        <div>
            <Header course={course} />
            <Content data={course.parts} />
            <Total exercises={course.parts} />
        </div>
    )
}

export default Course