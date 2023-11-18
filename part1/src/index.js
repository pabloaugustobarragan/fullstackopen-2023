import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return <h1>{course}</h1>
}

const Content = ({data}) => {
  return <>
    {
      data.map((element, i) => {
        return <Part key={i} part={element.part} exercises={element.exercises}/>
      })
    }
  </>
}

const Part = ({part, exercises}) => {
  return <p>{part} {exercises}</p>
}

const Total = ({exercises}) => {
  const total = exercises.reduce((sum, a) => sum+a.exercises, 0);
  return <p>Number of exercises {total}</p>;
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content data={[{part: part1, exercises: exercises1}, {part: part2, exercises: exercises2}, {part: part3, exercises: exercises3}]} />
      <Total exercises={[{exercises: exercises1}, {exercises: exercises2}, {exercises: exercises3}]} />
      
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))