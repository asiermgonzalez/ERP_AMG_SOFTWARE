import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss'],
})
export class CreateRolesComponent {
  @Output() RoleC: EventEmitter<any> = new EventEmitter();
  name: string = '';
  isLoading: any;
  SIDEBAR: any = SIDEBAR; // Listado de roles y permisos cargados en config.ts
  permissions: any = [];

  constructor(
    public modal: NgbActiveModal,
    public rolesService: RolesService,
    public toast: ToastrService
  ) {}

  ngOnInit(): void {}

  /*
   * Función que se encarga de agregar los permisos al array de permisos
   * @param permiso: string
   * @return void
   * @autor Asier Martín
   * @date 2025-02-10
   * @version 1.0
   * @see config.ts
   * @see create-roles.component.html
   * @see roles.service.ts
   * @see PermissionsDemoSeeder.php
   */
  addPermission(permiso: string) {
    let INDEX = this.permissions.findIndex((perm: string) => perm == permiso);

    if (INDEX != -1) {
      // Si se desmarca un check, se elimina el permiso del array
      this.permissions.splice(INDEX, 1);
    } else {
      // Si se marca un check, se agrega el permiso al array
      this.permissions.push(permiso);
    }

    // Muestra por consola el array de los permisos que se van checando o deschecando
    console.log(this.permissions);
  }

  store() {
    // Validar que el nombre del rol no esté vacío
    if (!this.name) {
      this.toast.error('Validación', 'Debes añadir un nombre para el rol');
      return false;
    }

    // Validar que se haya seleccionado al menos un permiso
    if (this.permissions.length == 0) {
      this.toast.error(
        'Validación',
        'Necesitas seleccionar al menos un permiso'
      );
      return false;
    }

    let data = {
      name: this.name,
      permissions: this.permissions,
    };

    // Se llama al servicio para registrar un nuevo rol
    this.rolesService.registerRole(data).subscribe((resp: any) => {
      console.log(resp);

      // Si hay errores, se muestra un mensaje de error
      if (resp.message == 403) {
        this.toast.error('Validación', resp.message_text);
      } else {        
        // Si el rol se ha creado correctamente, se muestra un mensaje de éxito
        this.toast.success('Rol creado', 'El rol se ha creado correctamente');
        this.RoleC.emit(resp.role); // Se emite el rol creado hacia list-roles.component.ts
        this.modal.close(); // Se cierra el modal
      }

      
    });
  }
}
