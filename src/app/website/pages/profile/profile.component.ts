import { Component, OnInit } from '@angular/core';

// services
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    //this.authService.getProfile()
    this.authService.user$
    .subscribe(data => {
      this.user = data;
    })
  }
}
