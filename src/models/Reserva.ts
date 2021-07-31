import moment from "moment";

export interface iReserva {
  id: string,
  idUsuario: string,
  idAmbiente: string,
  horario: string,
  data: moment.Moment
}