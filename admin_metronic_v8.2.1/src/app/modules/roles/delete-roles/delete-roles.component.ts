import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.scss'],
})
export class DeleteRolesComponent {
  @Output() RoleD: EventEmitter<any> = new EventEmitter(); // Emite datos hacia el padre
  @Input() ROLE_SELECTED: any; // Recibe datos desde el padre
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

  delete() {
    this.rolesService.deleteRole(this.ROLE_SELECTED.id).subscribe((resp: any) => {
      console.log(resp);

      // Si hay errores, se muestra un mensaje de error
      if (resp.message == 403) {
        this.toast.error('Validación', resp.message_text);
      } else {
        // Si el rol se ha editado correctamente, se muestra un mensaje de éxito
        this.toast.success('Rol creado', 'El rol se ha eliminado correctamente');
        this.RoleD.emit(resp.role); // Se emite el rol eliminado hacia list-roles.component.ts
        this.modal.close(); // Se cierra el modal
      }
    });
  }

}
