const ListCountry = (props) => {
  
    return (
        <div>
            <p>{props.name}
            <button value={props.name} onClick={props.showCountry}>Show</button>
            </p>
        </div>
      )
}

export default ListCountry