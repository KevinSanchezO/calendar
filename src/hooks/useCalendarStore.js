import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {
    const {events, activeEvent} = useSelector(state => state.calendar); // access all the states inside the reducer of calendarSlice
    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ));
    }

    const startSavingEvent = async(calendarEvent) => {
        if (calendarEvent._id) {
            // Actualizando
            dispatch(onUpdateEvent( {...calendarEvent} ));
        } else {
            // Creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
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
    }
}
