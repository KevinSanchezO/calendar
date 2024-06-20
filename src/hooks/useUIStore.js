import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice';

/**
 * custom hook to handle ui elements like the modal in calendar
 */
export const useUIStore = () => {
    const { isDateModalOpen } =useSelector( state=> state.ui ); // access al the states inside the reducer of uiSlice
    const dispatch = useDispatch() // allows to access the functions of the reducer

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
        ? openDateModal()
        : closeDateModal();
    }
    
    return {
        //* Properties
        isDateModalOpen,

        //* Métodos
        openDateModal,
        closeDateModal,
        toggleDateModal
    }
}
