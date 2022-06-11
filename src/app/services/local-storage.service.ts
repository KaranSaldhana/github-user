import { Injectable } from '@angular/core';
import { UserDetails } from '../interface/user-details'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /** Will return an array of github users */
  getGithubUsers():Array<{username: string, status: string}> {
    const githubUsers = localStorage.getItem('githubUsers')
    return githubUsers ? JSON.parse(githubUsers) : [];
  }

  setGithubUsers(value: string) {
    return localStorage.setItem('githubUsers', value)
  }

  clearGithubUsers(key: string) {
    return localStorage.removeItem(key);
  }
}
