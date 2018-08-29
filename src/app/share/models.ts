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
    firma: string;
    grupo: string;
    id_grupo: number;
    activo: boolean;
  }

export class Username {
    id: number;
    nombre: string;
    apellido: string;
    username: string;
    genero: string;
    telefono: string;
    mail: string;
    perfil: string;
    organizacion: string;
    grupos: any;
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
  grupo: string;
  enviados: number;
  total: number;
  programado: string;
  categoria: string;
  fechaCreacion: string;
  fechaEnvio: string;
  mensaje: string;
  enviador: string;
}

