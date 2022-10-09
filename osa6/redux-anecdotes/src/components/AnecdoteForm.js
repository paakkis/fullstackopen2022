import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={newAnecdote}>
        <input name="anecdote" />
        <button>create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm


