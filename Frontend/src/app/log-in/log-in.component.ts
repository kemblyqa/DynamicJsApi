import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/shared/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
