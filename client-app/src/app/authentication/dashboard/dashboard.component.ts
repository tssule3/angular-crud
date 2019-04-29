import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
user:any;
today:any;
  constructor(private _router: Router,
    private _actRoute: ActivatedRoute) { 
      _actRoute.params.subscribe((data) => {
        console.log('dashboard', data);
        if(data){
          this.user = data.name;
          this.today = new Date().toLocaleString();
        }
      });
    }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }
}
