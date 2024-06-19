import { parse, startOfWeek, getDay, format } from 'date-fns';
import { dateFnsLocalizer } from 'react-big-calendar';
import enUS from 'date-fns/locale/en-US';
import esES from 'date-fns/locale/es';


const locales = {
    'es': esES,
};

/**
 * easier way to access atributes of the calendar 
 */
export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});