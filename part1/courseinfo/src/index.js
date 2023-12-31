import React from 'react'
import ReactDOM from 'react-dom'

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
  return <p>Number of exercises {total}</p>;
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content data={course.parts} />
      <Total exercises={course.parts} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))