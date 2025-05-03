// utils/dateFormatter.js
import { parseISO, format } from 'date-fns';

export const formatToMMddyyyy = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'MM.dd.yyyy');
};
