import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Statistics = (props) => {
    return (
      <div>
        <h1>statistic</h1>
        {
          good + neutral + bad == 0 ? <div>No feedback given</div> :
            <>
              <div>good {props.good}</div>
              <div>neutral {props.neutral}</div>
              <div>bad {props.bad}</div>
              <div>all {props.good + props.neutral + props.bad}</div>
              <div>average {(props.good - props.bad) / (props.good + props.neutral + props.bad)}</div>
              <div>positive {(props.good - props.bad) / (props.good + props.neutral + props.bad) * 100}%</div>
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

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)