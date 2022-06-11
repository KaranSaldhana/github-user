import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserDialogComponent } from '../user-dialog/user-dialog.component';

import { LocalStorageService } from '../services/local-storage.service';
import { GithubUsersService } from '../services/github-users.service';

export interface HistoryElement { username: string, status: string }
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = ['index', 'username', 'status', 'action'];
  dataSource: Array<HistoryElement> = this.localStorageService.getGithubUsers();

  constructor(
    private localStorageService: LocalStorageService,
    private githubUserService: GithubUsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  getUserDetails(element: HistoryElement) {
    this.githubUserService.getGithubUser(element.username).subscribe(user => {
      this.dialog.open(UserDialogComponent, {
        data: user,
      });
    })
  }

  clearHistory() {
    this.localStorageService.clearGithubUsers('githubUsers');
    this.dataSource = this.localStorageService.getGithubUsers();
  }
}
