import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onSetActiveEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {
    const {events, activeEvent} = useSelector(state => state.calendar); // access all the states inside the reducer of calendarSlice
    const dispatch = useDispatch();

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ));
    }

    return {
        //* Properties
        events,
        activeEvent,

        //* Métodos
        setActiveEvent,
    }
}
