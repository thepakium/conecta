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
    organizacion: string;
    nombre: string;
    apellido: string;
    telefono: number;
    genero: string;
    barrio: string;
  }

export class Categoria {
    nombre: string;
    id: number;
  }
