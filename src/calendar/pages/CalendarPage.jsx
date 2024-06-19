import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { Navbar, CalendarEvent } from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';


const events = [{
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Kevin'
    }
}];

/**
 * page to render the calendar which takes all the page
 */
export const CalendarPage = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week'); //stores the last view tab

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    }

    /**
     * functions to handle the different events of the calendar 
     */
    const onDoubleClick = (event) => {
        console.log({ doubleClick: event });
    }
    
    const onSelect = ( event ) => {
        console.log({ click: event });
    }
    
    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView( event );
    } 

    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px' }}
                messages={getMessagesES()}
                eventPropGetter={ eventStyleGetter }

                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }

            />

        </>
    )
}
