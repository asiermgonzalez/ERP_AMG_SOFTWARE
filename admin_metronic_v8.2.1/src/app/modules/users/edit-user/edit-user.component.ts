import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../service/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent {
  @Output() UserE: EventEmitter<any> = new EventEmitter();
  @Input() roles: any = [];
  @Input() USER_SELECTED: any = []; // Usuario seleccionado para editar

  name: string = '';
  surname: string = '';
  email: string = '';
  phone: string = '';
  role_id: string = '';
  gender: string = '';
  type_document: string = 'DNI';
  n_document: string = '';
  address: string = '';
  file_name: any;
  imagen_previsualiza: any;
  password: string = '';
  password_repeat: string = '';

  isLoading: any;

  constructor(
    public modal: NgbActiveModal,
    public usersService: UsersService,
    public toast: ToastrService
  ) {}

  ngOnInit(): void {

    console.log(this.USER_SELECTED);

    this.name = this.USER_SELECTED.name;
    this.surname = this.USER_SELECTED.surname;
    this.email = this.USER_SELECTED.email;
    this.phone = this.USER_SELECTED.phone;
    this.role_id = this.USER_SELECTED.role_id;
    this.gender = this.USER_SELECTED.gender;
    this.type_document = this.USER_SELECTED.type_document;
    this.n_document = this.USER_SELECTED.n_document;
    this.address = this.USER_SELECTED.address;
    this.imagen_previsualiza = this.USER_SELECTED.avatar;
  }

  update() {
    // Validaciones nombre
    if (!this.name) {
      this.toast.error('Validación', 'El nombre es requerido');
      return false;
    }

    if (this.name.length > 50) {
      this.toast.error(
        'Validación',
        'El nombre no puede tener más de 50 caracteres'
      );
      return false;
    }

    // Apellidos
    if (this.surname.length > 100) {
      this.toast.error(
        'Validación',
        'Los apellidos no puede tener más de 100 caracteres'
      );
      return false;
    }

    // Email
    if (!this.email) {
      this.toast.error('Validación', 'El email es requerido');
      return false;
    }

    // Expresión regular para validar un email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email)) {
      this.toast.error('Validación', 'El email no tiene un formato válido');
      return false;
    }

    if (this.email.length > 250) {
      this.toast.error(
        'Validación',
        'El email no puede tener más de 250 caracteres'
      );
      return false;
    }

    // Teléfono
    if (this.phone.length > 14) {
      this.toast.error(
        'Validación',
        'El teléfono no puede tener más de 14 caracteres'
      );
      return false;
    }

    // Rol
    if (!this.role_id) {
      this.toast.error('Validación', 'El rol es requerido');
      return false;
    }

    // Tipo de documento
    if (!this.type_document) {
      this.toast.error('Validación', 'El tipo de documento es requerido');
      return false;
    }

    // Número de documento
    if (!this.n_document) {
      this.toast.error('Validación', 'El número de documento es requerido');
      return false;
    }

    // Contraseñas
    if (this.password && this.password != this.password_repeat) {
      this.toast.error('Validación', 'Las contraseñas no coinciden');

      return false;
    } else if (
      this.password &&
      this.password == this.password_repeat &&
      this.password.length < 8
    ) {
      this.toast.error(
        'Validación',
        'La contraseña debe tener al menos 8 caracteres'
      );
      return false;
    }

    let formData = new FormData();

    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('email', this.email);
    formData.append('phone', this.phone);
    formData.append('role_id', this.role_id);
    formData.append('gender', this.gender);
    formData.append('type_document', this.type_document);
    formData.append('n_document', this.n_document);

    if (this.address) formData.append('address', this.address);
    if (this.password) formData.append('password', this.password);
    if (this.file_name) formData.append('imagen', this.file_name);

    // Se llama al servicio para editar el usuario
    this.usersService
      .updateUser(this.USER_SELECTED.id, formData)
      .subscribe((resp: any) => {
        console.log(resp);

        // Si hay errores, se muestra un mensaje de error
        if (resp.message == 403) {
          this.toast.error('Validación', resp.message_text);
        } else {
          // Si el usuario se ha creado correctamente, se muestra un mensaje de éxito
          this.toast.success(
            'Usuario creado',
            'El usuario se ha editado correctamente'
          );
          this.UserE.emit(resp.user); // Se emite el usuario creado hacia list-users.component.ts
          this.modal.close(); // Se cierra el modal
        }
      });
  }

  // Guardar la imagen del usuario
  processFile($event: any) {
    // Validar que el archivo seleccionado sea una imagen
    if ($event.target.files[0].type.indexOf('image') < 0) {
      this.toast.warning(
        'Validación',
        'El archivo seleccionado no es una imagen'
      );
      return;
    }

    this.file_name = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.file_name);
    reader.onload = () => (this.imagen_previsualiza = reader.result);
  }
}
