import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
 @Output() UserD: EventEmitter<any> = new EventEmitter(); // Emite datos hacia el padre
  @Input() USER_SELECTED: any; // Recibe datos desde el padre
  name: string = '';
  isLoading: any;
  permissions: any = [];

  constructor(
    public modal: NgbActiveModal,
    public usersService: UsersService,
    public toast: ToastrService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.usersService.deleteUser(this.USER_SELECTED.id).subscribe((resp: any) => {
      console.log(resp);

      // Si hay errores, se muestra un mensaje de error
      if (resp.message == 403) {
        this.toast.error('Validación', resp.message_text);
      } else {
        // Si el rol se ha editado correctamente, se muestra un mensaje de éxito
        this.toast.success('Usuario elimnado', 'El rol se ha eliminado correctamente');
        this.UserD.emit(resp.user); // Se emite el rol eliminado hacia list-roles.component.ts
        this.modal.close(); // Se cierra el modal
      }
    });
  }
}
