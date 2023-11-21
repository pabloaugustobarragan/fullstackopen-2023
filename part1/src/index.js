import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
  return <h1>{course}</h1>
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
  console.log(exercises);
  const total = exercises.reduce((sum, a) => sum + a, 0);
  console.log(total);
  return <p>Number of exercises {total}</p>;
}

const App = () => {
  const course = 'Half Stack application development'

  const part1 = { name: 'Fundamentals of React', exercises: 10 }
  const part2 = { name: 'Using props to pass data', exercises: 7 }
  const part3 = { name: 'State of a component', exercises: 14 }

  return (
    <div>
      <Header course={course} />
      <Content data={[part1, part2, part3]} />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))