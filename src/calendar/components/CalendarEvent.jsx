
/**
 * Box component of the different tasks that can be inside the calendar
 */
export const CalendarEvent = ({event}) => {
    
    const {title, user} = event;

    return (
        <>
            <strong>{ title }</strong>
            <span> - { user.name }</span>
        </>
    )
}
