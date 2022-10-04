const Course = (props) => {
    //console.log(props)
    const { course } = props
    const total = course.parts.reduce(
        (previousValue, currentValue) => previousValue + currentValue.exercises, 0,)
 
    return (
        <div>
            <Title course={course.name}/>
            <p>{course.parts.map(part =>
                <ul key={part.id}>
                    {part.name} {part.exercises}
                </ul>
            )}</p>
            <TotalExercises total={total}/>
        </div>
    )
}

const Title = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}

const TotalExercises = (props) => {
    return (
        <b>total of {props.total} exercises</b>
    )
}


export default Course
