/**
 * Tipos de autenticación AGROCOM V3.
 *
 * Login: `POST /autentificacion` con la contraseña en Base64.
 * Refresh: `POST /actualizar-token` con `{ token: refreshToken }` (rota el refreshToken).
 * Ambos endpoints devuelven `AuthResponse` dentro de `ApiResponse<AuthResponse>`.
 */

/** Body del login. `password` viaja codificado en Base64 (`btoa`). */
export interface AuthRequest {
  userName: string;
  /** Contraseña en Base64. */
  password: string;
}

/** Body del refresh proactivo. Se envía el refreshToken vigente. */
export interface RefreshRequest {
  token: string;
}

/**
 * Ítem de menú del sidebar dinámico.
 * Es jerárquico: los hijos referencian al padre vía `idMenuPadre`.
 */
export interface MenuItem {
  id: number;
  descripcion: string;
  icono: string;
  area: string;
  controlador: string;
  valoresProcesos: string;
  accion: string;
  orden: number;
  /** `true` si tiene submenús. */
  flagHijos: boolean;
  /** `null` si es nodo raíz; si no, apunta al `id` del padre. */
  idMenuPadre: number | null;
  visible: boolean;
}

/** Respuesta de login/refresh: sesión + usuario + menús. */
export interface AuthResponse {
  id: string;
  name: string;
  perfil: number | null;
  descripcionPerfil: string;
  userName: string;
  userStatus: string;
  email: string;
  /** JWT de acceso. */
  token: string;
  /** Token rotatorio para renovar la sesión. */
  refreshToken: string;
  /** Timestamp Unix de expiración del JWT (base del refresh proactivo). */
  expToken: number;
  referenciaId: number;
  empresa: string;
  /** Menús del usuario para construir el sidebar. */
  menus: MenuItem[];
}
