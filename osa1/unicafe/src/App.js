import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0){
    return (
      <div><p>no feedback given.</p></div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={good + neutral + bad}/>
        <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)}/>
        <StatisticLine text="positive" value={good / (good + neutral + bad) * 100 + '%'}/>
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodFeedBack = () => {
    setGood(good + 1)
  }
  const setNeutralFeedBack = () => {
    setNeutral(neutral + 1)
  }
  const setBadFeedBack = () => {
    setBad(bad + 1)
  }

    
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setGoodFeedBack} text="good"/>
      <Button handleClick={setNeutralFeedBack} text="neutral"/>
      <Button handleClick={setBadFeedBack} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App