import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, public authservice: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

   /**
   * Servicio que se encarga de obtner el listado de roles
   * @param page
   * @param search
   * @returns
   * @autor Asier Martín
   * @date 2025-02-11
   * @version 1.0
   * @see create-users.component.ts
   * @see users.service.ts createUser()
   */
  configAll() {
    // Inicio de petición HTTP
    this.isLoadingSubject.next(true);
    // Se obtiene el token del usuario logueado
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    // Se obtiene la URL del servicio
    let URL = URL_SERVICIOS + '/users/config';

    // Se realiza la petición POST al servicio
    return (
      this.http
        .get(URL, { headers: headers })
        // Fin de petición HTTP
        .pipe(finalize(() => this.isLoadingSubject.next(false)))
    );
  }

  /**
   * Servicio que se encarga de listar los usuarios
   * @param page
   * @param search
   * @returns
   * @autor Asier Martín
   * @date 2025-02-10
   * @version 1.0
   * @see list-users.component.ts
   */
  listUsers(page = 1, search: string = '') {
    // Inicio de petición HTTP
    this.isLoadingSubject.next(true);
    // Se obtiene el token del usuario logueado
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    // Se obtiene la URL del servicio
    let URL = URL_SERVICIOS + '/users?page=' + page + '&search=' + search;

    // Se realiza la petición POST al servicio
    return (
      this.http
        .get(URL, { headers: headers })
        // Fin de petición HTTP
        .pipe(finalize(() => this.isLoadingSubject.next(false)))
    );
  }

  /**
   * Servicio que se encarga de registrar un nuevo usuario
   * @param data
   * @returns
   * @autor Asier Martín
   * @date 2025-02-10
   * @version 1.0
   * @see create-user.component.ts
   */
  createUser(data: any) {
    // Inicio de petición HTTP
    this.isLoadingSubject.next(true);
    // Se obtiene el token del usuario logueado
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    // Se obtiene la URL del servicio
    let URL = URL_SERVICIOS + '/users';

    // Se realiza la petición POST al servicio
    return (
      this.http
        .post(URL, data, { headers: headers })
        // Fin de petición HTTP
        .pipe(finalize(() => this.isLoadingSubject.next(false)))
    );
  }

  /**
   * Servicio que se encarga de editar los usuarios
   * @param page
   * @param search
   * @returns
   * @autor Asier Martín
   * @date 2025-02-10
   * @version 1.0
   * @see edit-user.component.ts
   */
  updateUser(ID_USER: string, data: any) {
    // Inicio de petición HTTP
    this.isLoadingSubject.next(true);
    // Se obtiene el token del usuario logueado
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    // Se obtiene la URL del servicio
    let URL = URL_SERVICIOS + '/users/' + ID_USER;

    // Se realiza la petición POST al servicio
    return (
      this.http
        .post(URL, data, { headers: headers }) // POST porque enviamos imágenes
        // Fin de petición HTTP
        .pipe(finalize(() => this.isLoadingSubject.next(false)))
    );
  }

  /*
   * Servicio que se encarga de eliminar un usuario
   * @param ID_USER
   * @return void
   * @autor Asier Martín
   * @date 2025-02-10
   * @version 1.0
   * @see delete-user.component.ts
   */
  deleteUser(ID_USER: string) {
    // Inicio de petición HTTP
    this.isLoadingSubject.next(true);
    // Se obtiene el token del usuario logueado
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    // Se obtiene la URL del servicio
    let URL = URL_SERVICIOS + '/users/' + ID_USER;

    // Se realiza la petición DELETE al servicio
    return (
      this.http
        .delete(URL, { headers: headers })
        // Fin de petición HTTP
        .pipe(finalize(() => this.isLoadingSubject.next(false)))
    );
  }
}
