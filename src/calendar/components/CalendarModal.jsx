import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUIStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

/**
 * Modal form for the calendar to create new events to add
 */
export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUIStore();// access the information of the uiSlice from the customHook to access the info
    const { activeEvent, startSavingEvent } = useCalendarStore()
    const [formSubmited, setformSubmited] = useState(false);
    const [formValues, setformValues] = useState({
        title: 'Kevin',
        notes: 'Sanchez',
        start: new Date(),
        end: addHours( new Date(), 2 ),
    }); // the data of the form in the modal

    const titleClass = useMemo(() => {
        if (!formSubmited) return '';

        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid'
    }, [formValues.title, formSubmited])

    useEffect(() => {
        if (activeEvent !== null) {
            setformValues({...activeEvent}); // uses spread to break the reference of the original value in the store
        }
    }, [activeEvent])
    

    const onInputChange = ({target}) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing) => {
        setformValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        closeDateModal()
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setformSubmited(true);

        // if the difference is positive then the dates are valid
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return;
        }

        if (formValues.title.length <= 0) return;

        await startSavingEvent( formValues );
        closeDateModal();
        setformSubmited(false);
    }

    return (
        <Modal
            isOpen = {isDateModalOpen}
            onRequestClose={ onCloseModal }
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        className='form-control'
                        onChange={(event) =>  onDateChanged(event, 'start')}
                        dateFormat="Pp"
                        showTimeSelect
                        wrapperClassName="w-100"
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        minDate={formValues.start}
                        selected={formValues.end}
                        className='form-control'
                        onChange={(event) =>  onDateChanged(event, 'end')}
                        showTimeSelect
                        dateFormat="Pp"
                        wrapperClassName="w-100"
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
