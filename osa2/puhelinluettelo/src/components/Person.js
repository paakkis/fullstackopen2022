const Person = (props) => {
    return (
      <li>
          {props.name} {props.number}
          <button onClick={props.toggleRemovePerson}>delete</button>
        </li>
      
    )
  }
  
  export default Person