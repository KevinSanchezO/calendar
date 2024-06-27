import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useUIStore, useCalendarStore, useAuthStore } from '../../hooks';

/**
 * page to render the calendar which takes all the page
 */
export const CalendarPage = () => {

    const { openDateModal } = useUIStore()
    const { user } = useAuthStore();
    const { events, setActiveEvent, startLoadingEvents} = useCalendarStore()
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week'); //stores the last view tab

    const eventStyleGetter = (event, start, end, isSelected) => {
        const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

        const style = {
            backgroundColor: isMyEvent ? '#347CF7':'#465660',
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
        openDateModal();
    }
    
    const onSelect = ( event ) => {
        // console.log({ click: event });
        setActiveEvent(event)
    }
    
    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView( event );
    }
    
    useEffect(() => {
        startLoadingEvents();
    }, [])
    

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

            <CalendarModal />
            <FabAddNew />
            <FabDelete />

        </>
    )
}
