import { format, formatRelative, fromUnixTime } from 'date-fns';
import { es } from 'date-fns/locale';

export function getFormatedDate(dt, index) {
  if (index === 0) {
    return formatRelative(new Date(fromUnixTime(dt)), new Date(), { locale: es }).split(" ")[0];
  }

  return format(new Date(fromUnixTime(dt)), 'E, dd MMM', { locale: es });
};
