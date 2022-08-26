import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {

  @Input() name: string = '';
  @Input() id: string = '';
  @Input() Form!: FormGroup;
  @Input() type: string = '';
  @Input() dataList: any[] | undefined = [];

  public search: FormControl = new FormControl();

  listShow: string[] | undefined = [];

  // searchTimeoutSetting
  typingTimer: any;
  doneTypingInterval = 1500;

  constructor() { }

  ngOnInit(): void {
    this.search.valueChanges.subscribe(value => {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.filterGroup(value);
      }, this.doneTypingInterval);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listShow = this.dataList!;
  }

  filterGroup(value: string) {
    if (value) {
      this.listShow = this.dataList?.filter(data => { return data.toLowerCase().includes(value.toLowerCase()) })
    } else {
      this.listShow = this.dataList;
    }
  }

}
