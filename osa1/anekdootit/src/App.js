import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(7))
  const [mostVotes, setMostVotes] = useState("")
  const copy = [...votes]

  const getRandom = newValue => {
    newValue = Math.floor(Math.random() * anecdotes.length)
    setSelected(newValue)
    //console.log(newValue)
  }

  const handleVoteClick = () => {
    
    copy[selected] += 1
    setVotes(copy)
    //console.log(copy)
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <br /> 
      has {votes[selected]} points.
      <br />
      <Button handleClick={() => getRandom()} text="Next anecdote"/>
      <Button handleClick={handleVoteClick} text="vote"/>
      <br />
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {Math.max(...votes)} votes</p>
    </div>
  )
}

export default App