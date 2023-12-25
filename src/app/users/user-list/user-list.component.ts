import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { read, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public users: User[] = [];
  displayUser: User[] = [];
  isLoading = false;
  isSearching = false;
  currentPage = 1;
  numOfItemOnPage = 5;
  showModalDelete: boolean = false;
  showModalExport: boolean = false;

  userIdToDelete: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.subscribe((users) => (this.users = users));
  }

  public deleteUserById(id: number | undefined): void {
    const isConfirm = confirm('Dp you want to delete user ' + id);
    if (isConfirm) {
      const isSuccess = this.userService.deleteUserById(id);
      if (isSuccess) {
        alert(`Delete user ${id} successfully!`);
      }
    }
  }

  // deleteUser() {
  //   this.userService.deleteUserById(this.userIdToDelete);
  //   this.showModalDelete = false;
  // }

  // onCloseModal() {
  //   this.showModalDelete = false;
  //   this.showModalExport = false;
  // }

  // updateDisplayList(event: User[]) {
  //   this.displayUser = event;
  // }

  // updateCurrentPage(current: number) {
  //   this.currentPage = current;
  // }

  // onSearching(event: boolean) {
  //   this.isSearching = event;
  // }

  // setUserIdToDelete(id: number) {
  //   this.userIdToDelete = id;
  //   this.showModalDelete = true;
  // }

  importCSV(event: any) {
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = read(data, { type: 'array' });

      // Get the first worksheet
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Convert the worksheet to JSON
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

      // Process the JSON data
      const list: User[] = [];
      jsonData.forEach((user: any, index) => {
        if (index !== 0) {
          let temp: User = {
            id: parseInt(user[0]),
            firstName: user[1].toString(),
            lastName: user[2].toString(),
            username: user[3].toString(),
            password: user[4].toString(),
          };
          list.push(temp);
        }
      });
      this.userService.importDataFromFile(list);
    };
    reader.readAsArrayBuffer(file);
  }

  // onExport() {
  //   this.showModalExport = true;
  // }

  exportToCSV() {
    if (this.users.length === 0) {
      return alert('Empty list!');
    } else {
      // convert ID to string
      const newUsers = this.users.map((user) => {
        return {
          ...user,
          id: user.id?.toString(),
        };
      });
      console.log(newUsers);
      const heading = [
        ['ID', 'Username', 'Password', 'First Name', 'Last Name'],
      ];
      const wb = utils.book_new();
      const ws = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, heading);
      utils.sheet_add_json(ws, newUsers, {
        origin: 'A2',
        skipHeader: true,
      });
      utils.book_append_sheet(wb, ws, 'Users');
      writeFile(wb, 'data.csv');
    }
    this.showModalExport = false;
  }
}
