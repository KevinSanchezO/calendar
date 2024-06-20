import React from 'react'
import { useCalendarStore, useUIStore } from '../../hooks'
import { addHours } from 'date-fns';

/**
 * floating button to create new events
 */
export const FabAddNew = () => {
    const {setActiveEvent} = useCalendarStore();
    const {openDateModal} = useUIStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Kevin'
            }
        })

        openDateModal();
    }
    
    return (
        <button
            className='btn btn-primary fab'
            onClick={handleClickNew}
        >
            <i className='fa fa-plus'></i>
        </button>
    ) 
}
