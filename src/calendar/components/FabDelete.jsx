import React from 'react'
import { useCalendarStore, useUIStore } from '../../hooks'

/**
 * floating button to create new events
 */
export const FabDelete = () => {
    const {startDeletingEvent, hasEventSelected} = useCalendarStore();
    const {isDateModalOpen} = useUIStore();

    const handleDelete = () => {
        startDeletingEvent();
    }
    
    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleDelete}
            style={{
                display: hasEventSelected && !isDateModalOpen ? '': 'none'
            }}
        >
            <i className='fa fa-trash-alt'></i>
        </button>
    ) 
}
