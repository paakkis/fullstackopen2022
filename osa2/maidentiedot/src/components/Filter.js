const Filter = (props) => {
    return (
        <form>
        Find countries:
        <input
            value={props.filter}
            onChange={props.handleFilterInputChange} />
            <br />
        </form> 
    ) 
}

export default Filter