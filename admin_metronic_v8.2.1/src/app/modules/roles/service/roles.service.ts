import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, public authservice: AuthService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  /**
   * Servicio que se encarga de registrar un nuevo rol
   * @param data
   * @returns
   * @autor Asier Martín
   * @date 2025-02-10
   * @version 1.0
   * @see config.ts
   * @see auth.service.ts
   * @see create-roles.component.ts
   */
  registerRole(data: any) {
    // Inicio de petición HTTP
    this.isLoadingSubject.next(true);
    // Se obtiene el token del usuario logueado
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    // Se obtiene la URL del servicio
    let URL = URL_SERVICIOS + '/roles';

    // Se realiza la petición POST al servicio
    return (
      this.http
        .post(URL, data, { headers: headers })
        // Fin de petición HTTP
        .pipe(finalize(() => this.isLoadingSubject.next(false)))
    );
  }

  /**
   * Servicio que se encarga de listar los roles
   * @param page
   * @param search
   * @returns
   * @autor Asier Martín
   * @date 2025-02-10
   * @version 1.0
   * @see config.ts
   * @see auth.service
   * @see list-roles.component.ts
   */
  listRoles(page = 1, search: string = '') {
    // Inicio de petición HTTP
    this.isLoadingSubject.next(true);
    // Se obtiene el token del usuario logueado
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    // Se obtiene la URL del servicio
    let URL = URL_SERVICIOS + '/roles?page=' + page + '&search=' + search;

    // Se realiza la petición POST al servicio
    return (
      this.http
        .get(URL, { headers: headers })
        // Fin de petición HTTP
        .pipe(finalize(() => this.isLoadingSubject.next(false)))
    );
  }

  /**
   * Servicio que se encarga de editar los roles
   * @param page
   * @param search
   * @returns
   * @autor Asier Martín
   * @date 2025-02-10
   * @version 1.0
   * @see config.ts
   * @see auth.service
   * @see edit-roles.component.ts
   */
  updateRole(ID_ROLE: string, data: any) {
    // Inicio de petición HTTP
    this.isLoadingSubject.next(true);
    // Se obtiene el token del usuario logueado
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    // Se obtiene la URL del servicio
    let URL = URL_SERVICIOS + '/roles/' + ID_ROLE;

    // Se realiza la petición POST al servicio
    return (
      this.http
        .put(URL, data, { headers: headers })
        // Fin de petición HTTP
        .pipe(finalize(() => this.isLoadingSubject.next(false)))
    );
  }

  /*
   * Servicio que se encarga de eliminar un rol
   * @param ID_ROLE
   * @return void
   * @autor Asier Martín
   * @date 2025-02-10
   * @version 1.0
   * @see config.ts
   * @see auth.service.ts
   * @see delete-roles.component.ts
   */
  deleteRole(ID_ROLE: string) {
    // Inicio de petición HTTP
    this.isLoadingSubject.next(true);
    // Se obtiene el token del usuario logueado
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authservice.token,
    });
    // Se obtiene la URL del servicio
    let URL = URL_SERVICIOS + '/roles/' + ID_ROLE;

    // Se realiza la petición DELETE al servicio
    return (
      this.http
        .delete(URL, { headers: headers })
        // Fin de petición HTTP
        .pipe(finalize(() => this.isLoadingSubject.next(false)))
    );
  }
}
