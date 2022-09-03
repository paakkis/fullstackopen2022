const Filter = (props) => {
    return (
        <form>
        filter shown:
        <input
            value={props.newFilter}
            onChange={props.handleFilterInputChange} />
            <br />
        </form> 
    ) 
}

export default Filter