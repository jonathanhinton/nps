import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Park } from '../shared/park.model'

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss']
})
export class ParkComponent implements OnInit {

  @Input() park!: Park;

  @HostBinding('class') columnClass = 'four wide column';

  constructor() { }

  ngOnInit(): void {}

}
