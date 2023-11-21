import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const StatisticLine = (props) => {
    return (
      <div>{props.text} {props.value} {props.text == 'positive'? '%' : ''}</div>
    )
  }

  const Statistics = (props) => {
    return (
      <div>
        <h1>statistic</h1>
        {
          good + neutral + bad == 0 ? <div>No feedback given</div> :
            <>
              <StatisticLine text={"good"} value={props.good} />
              <StatisticLine text={"neutral"} value={props.neutral} />
              <StatisticLine text={"bad"} value={props.bad} />
              <StatisticLine text={"all"} value={props.good + props.neutral + props.bad} />
              <StatisticLine text={"average"} value={(props.good - props.bad) / (props.good + props.neutral + props.bad)} />
              <StatisticLine text={"positive"} value={(props.good - props.bad) / (props.good + props.neutral + props.bad) * 100} />
            </>
        }
      </div>
    )
  }


  const handleGoodClick = () => {
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
  }

  const Button = (props) => {
     return <button onClick={props.handle}>{props.text}</button>
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handle={handleGoodClick} text={"good"}/>
      <Button handle={handleNeutralClick} text={"neutral"}/>
      <Button handle={handleBadClick} text={"bad"}/>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)