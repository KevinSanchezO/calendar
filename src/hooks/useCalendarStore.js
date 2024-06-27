import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarAPI from '../api/calendarAPI';
import { convertsEventsToDateEvent } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar); // access all the states inside the reducer of calendarSlice
    const {user} = useSelector(state => state.auth)

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ));
    }

    const startSavingEvent = async(calendarEvent) => {
        try {
            if (calendarEvent.id) {
                // Actualizando
                await calendarAPI.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return
            } else {
                // Creando
                const {data} = await calendarAPI.post('/events', calendarEvent);
                dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

        
    }

    const startDeletingEvent = async() => {
        try {
            await calendarAPI.delete(`/events/${activeEvent.id}`);
            Swal.fire('Eliminación exitosa', `${activeEvent.title} ha sido eliminada`, 'success');
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }
        
    }

    const startLoadingEvents = async() => {
        try {
            const {data} = await calendarAPI.get('/events');
            const events = convertsEventsToDateEvent(data.eventos);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error)
        }
    }

    return {
        //* Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent, //if the value is null returns false, otherwise returns true.

        //* Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}
