export class IngresoData {
    usuario = '';
    pass = '';
}

export class Formulario {
    mensaje: string;
    destinatarios: Usuario[];
    categoria: Categoria;
}

export class Usuario {
    id: number;
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    telefono: number;
    genero: string;
    email: string;
    rut: string;
    fechaNacimiento: Date;
    organizacion: string;
    barrio: string;
    id_barrio: number;
    activo: boolean;
  }

export class Username {
    id: number;
    nombre: string;
    apellido: string;
    usernames: string;
    genero: string;
  }

export class Categoria {
    nombre: string;
    id: number;
  }

export class Victima {
  tipo: string;
  quien: number;
  id: number;
}

export class Mensaje {
  organizacion: string;
  barrio: string;
  enviados: number;
  total: number;
  programado: string;
  categoria: string;
  fechaCreacion: string;
  fechaEnvio: string;
  mensaje: string;
  enviador: string;
}