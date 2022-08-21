import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { user } from '../../auth/model/auth.model';
import { AuthService } from '../../auth/service/auth.service';
import { employee } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  title = 'List Employer';

  listEmployee: employee[] = [];

  subscribs: Subscription[] = [];

  showListFilter: employee[] = [];

  lengthData: number = 10;
  showListLength: boolean = false;
  listLength: number[] = [10, 20, 40, 50];
  listPage: number[] = [];
  currentPage: number = 1;
  sortingBy: string = '';

  // searchTimeoutSetting
  typingTimer: any;
  doneTypingInterval = 1500;
  searchKeyword: string = '';


  constructor(
    private serviceAuth: AuthService,
    private service: EmployeeService
  ) { }

  ngOnInit(): void {
    this.getListEmployee();
  }

  ngOnDestroy(): void {
    this.subscribs.forEach(sub => sub.unsubscribe());
  }

  getListEmployee() {
    const sub = this.service.getListEmployee().subscribe(res => {
      this.listEmployee = [...this.listEmployee, ...res];
      this.countPage();
      this.showDataByLimit();
    });

    this.subscribs.push(sub);
  }

  expandDropMenu() {
    this.showListLength = !this.showListLength;
  }

  changeLimit() {
    this.currentPage = 1;
    this.expandDropMenu();
    this.showFilteringData();
    this.countPage();
  }

  showDataByLimit() {
    this.showListFilter = this.listEmployee.filter((data, index) => { return index <= (this.lengthData - 1) });
  }

  countPage() {
    this.listPage = [];
    let
      page = 0,
      totalData = (this.searchKeyword) ? this.showListFilter.length : this.listEmployee.length;

    do {
      page += 1;
      totalData -= this.lengthData;
      this.listPage.push(page);
    }

    while (totalData >= 0);
  }

  onSearchChange() {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.showFilteringData()
    }, this.doneTypingInterval);
  }

  onSetPage(page: number) {
    this.currentPage = page;
    this.showDataByPage()
  }

  onSetSorting(sort: string) {
    this.sortingBy = sort;
  }

  showFilteringData() {
    this.showDataByLimit();
    if (this.searchKeyword) {
      this.showListFilter =
        this.showListFilter
          .filter((data) => { return (data.firstName.includes(this.searchKeyword.toLowerCase()) || data.lastName.includes(this.searchKeyword.toLowerCase())) });
      this.countPage();
    }
  }

  showDataByPage() {
    let indexPageSelect = this.listPage.findIndex(page => page == this.currentPage);

    if (this.currentPage == 1) {
      this.showDataByLimit();
    } else {
      this.showListFilter =
        this.listEmployee
          .filter((data, index) => { return (index <= (this.currentPage * this.lengthData) - 1) && (index > ((this.listPage[indexPageSelect] - 1) * this.lengthData) - 1) })
    }
  }

  showDataSorting() {
    if (this.sortingBy == 'name') {
      this.showListFilter =
        this.showListFilter.sort((a, b) => {
          if (a.firstName < b.firstName)
            return -1;
          if (a.firstName > b.firstName)
            return 1;
          return 0;
        })
    }
  }

}
