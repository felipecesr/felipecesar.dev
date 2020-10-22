import { parseISO, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formatDate(dateString) {
  const date = parseISO(dateString);
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}
