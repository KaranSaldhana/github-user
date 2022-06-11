import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserDialogComponent } from '../user-dialog/user-dialog.component';

import { GithubUsersService } from '../services/github-users.service';
import { LocalStorageService } from '../services/local-storage.service';
import { UserDetails } from '../interface/user-details';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  displayedColumns: string[] = ['icon', 'login', 'bio', 'action'];
  dataSource: UserDetails[] = [];
  isUserSearch = false; // flag to know whether the user has searched for any user.

  constructor(
    private githubUserService: GithubUsersService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  openUserDialog(user: UserDetails) {
    this.dialog.open(UserDialogComponent, {
      data: user,
    });
  }

  /** to search github users based on username */
  searchUser(username: string) {
    if(!username){
      return;
    }

    this.isUserSearch = true;
    this.githubUserService.getGithubUser(username).subscribe(user => {
      const gihubUsers = this.localStorageService.getGithubUsers();

      if (!gihubUsers.find(user => user.username === username)) {
        gihubUsers.push({ username: username, status: user ? 'Found' : 'Not Found' });
        this.localStorageService.setGithubUsers(JSON.stringify(gihubUsers));
      }

      this.dataSource = user ? [user] : []
      console.log(user)
    })
  }
}
