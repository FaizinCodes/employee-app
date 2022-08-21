import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() showBack: boolean = false;
  @Input() title: string = '';
  @Input() showAdd: boolean = true;

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  back() {
    this.location.back();
  }

}
