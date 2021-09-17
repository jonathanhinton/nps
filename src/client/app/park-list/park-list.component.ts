import { Component, OnInit } from '@angular/core';
// import { Park } from '../shared/park.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.component.html',
  styleUrls: ['./park-list.component.scss']
})
export class ParkListComponent implements OnInit {

  parks: any = [];

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.fetchParks()
  }

  fetchParks() {
    return this.api.getParks().subscribe((data: {}) => {
      this.parks = data;
    })
  }

}
