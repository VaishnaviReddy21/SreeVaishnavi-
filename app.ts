/*import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('myDemo');
}*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- LOGIN PAGE -->
    <div [hidden]="loggedIn" class="login">
      <h2>Login</h2>
      <input #u placeholder="Username" />
      <input #p type="password" placeholder="Password" />
      <button (click)="login(u.value, p.value)">Login</button>
      <p [hidden]="!error" style="color:red">Invalid credentials</p>
    </div>

    <!-- HOME PAGE -->
    <div [hidden]="!loggedIn" class="home">
      <nav class="navbar">
        <span>User Directory</span>
        <div class="profile" (click)="toggleDropdown()">
          <img [src]="currentUser.photo" class="avatar" />
          <div [hidden]="!showDropdown" class="dropdown">
            <p><b>{{currentUser.name}}</b></p>
            <p>{{currentUser.email}}</p>
            <p>{{currentUser.company}}</p>
            <p>{{currentUser.phone}}</p>
            <p>{{currentUser.address}}</p>
            <button (click)="logout()">Logout</button>
          </div>
        </div>
      </nav>

      <h3>Users</h3>
      <div id="userList"></div>
    </div>
  `,
  styles: [`
    .login, .home { padding:20px; font-family:Arial; }
    .navbar { display:flex; justify-content:space-between; background:#eee; padding:10px; }
    .profile { position:relative; cursor:pointer; }
    .avatar { width:32px; height:32px; border-radius:50%; }
    .dropdown { position:absolute; right:0; background:#fff; border:1px solid #ccc; padding:10px; }
    .card { display:flex; gap:10px; border:1px solid #ccc; margin:10px; padding:10px; }
    .photo { width:64px; height:64px; object-fit:cover; }
  `]
})
export class AppComponent {
  loggedIn = false;
  error = false;
  showDropdown = false;

  currentUser = {
    name: 'Alfred Erdman',
    email: 'Tad.Prohaska@gmail.com',
    company: 'Glover - Zemlak',
    phone: '825.567.7308 x7897',
    address: '3146 Conroy Cove',
    photo: 'https://json-server.dev/ai-profiles/4.png'
  };

  users: any[] = [];
  placeholder = 'https://avatars.githubusercontent.com/u/583231?v=4';

  login(u: string, p: string) {
    if (u === 'admin' && p === 'password') {
      this.loggedIn = true;
      this.error = false;
      this.fetchUsers();
    } else {
      this.error = true;
    }
  }

  logout() {
    this.loggedIn = false;
    this.showDropdown = false;
    this.users = [];
    const list = document.getElementById('userList');
    if (list) list.innerHTML = '';
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  async fetchUsers() {
    try {
      const res = await fetch('https://fake-json-api.mock.beeceptor.com/users');
      this.users = await res.json();
      this.renderUsers();
    } catch {
      this.users = [];
    }
  }

  renderUsers() {
    const list = document.getElementById('userList');
    if (!list) return;
    list.innerHTML = '';
    this.users.forEach(u => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${u.photo || this.placeholder}" class="photo" />
        <div>
          <p><b>Name:</b> ${u.name || ''}</p>
          <p><b>Email:</b> ${u.email || ''}</p>
          <p><b>Company:</b> ${u.company || ''}</p>
          <p><b>Phone:</b> ${u.phone || ''}</p>
          <p><b>Address:</b> ${u.address || ''}</p>
        </div>
      `;
      list.appendChild(card);
    });
  }
}