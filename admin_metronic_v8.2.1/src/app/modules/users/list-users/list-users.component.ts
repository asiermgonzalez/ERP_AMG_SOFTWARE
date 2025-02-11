import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserComponent } from '../create-user/create-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent {
  search: string = '';
  USERS: any = [];
  isLoading$: any;
  totalPages: number = 0;
  currentPage: number = 1;

  constructor(
    public modalService: NgbModal,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.usersService.isLoading$;
    this.listUsers();
  }

  listUsers(page = 1) {
    this.usersService.listUsers(page, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.USERS = resp.users;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  loadPage($event: any) {
    this.listUsers($event);
  }

  /**
   * Abre el modal para crear un nuevo usuario
   */
  createUser() {
    const modalRef = this.modalService.open(CreateUserComponent, {
      centered: true,
      size: 'md',
    });

    // Se suscribe al evento que se emite al cerrar el modal
    modalRef.componentInstance.UserC.subscribe((role: any) => {
      this.USERS.unshift(role);
    });
  }

  editUser(USER: any) {
    const modalRef = this.modalService.open(EditUserComponent, {
      centered: true,
      size: 'md',
    });

    // Se envía el usuario seleccionado al componente hijo (edit-user.component.ts)
    modalRef.componentInstance.USER_SELECTED = USER;

    // Se suscribe al evento que se emite al cerrar el modal
    modalRef.componentInstance.UserE.subscribe((user: any) => {
      let INDEX = this.USERS.findIndex((user: any) => user.id == USER.id);

      if (INDEX != -1) {
        this.USERS[INDEX] = user;
      }
    });
  }

  deleteUser(USER: any) {
    const modalRef = this.modalService.open(DeleteUserComponent, {
      centered: true,
      size: 'md',
    });

    // Se envía el rol seleccionado al componente hijo (edit-users.component.ts)
    modalRef.componentInstance.USER_SELECTED = USER;

    // Se suscribe al evento que se emite al cerrar el modal
    modalRef.componentInstance.UserD.subscribe((user: any) => {
      let INDEX = this.USERS.findIndex((user: any) => user.id == USER.id);

      if (INDEX != -1) {
        this.USERS.splice(INDEX, 1);
      }
    });
  }
}
