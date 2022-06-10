import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserDialogComponent } from '../user-dialog/user-dialog.component'

import { GithubUsersService } from '../services/github-users.service'
import { UserDetails } from '../interface/user-details'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchUsername = '';
  githubUser!: UserDetails;

  constructor(
    private githubUserService: GithubUsersService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  openUserDialog() {
    this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: this.githubUser,
    });
  }


  searchUser(username: string) {
    this.githubUserService.getGithubUser(username).subscribe(user => {
      this.githubUser = user;
      console.log(user)
    })
  }
}
