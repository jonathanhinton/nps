import { Component, OnInit } from '@angular/core';
import { Park } from '../shared/park.model';
import { ApiService } from '../shared/api.service';
// import { ActivatedRoute } from '@angular/router';
// import { Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-park-list',
  templateUrl: './park-list.component.html',
  styleUrls: ['./park-list.component.scss']
})
export class ParkListComponent implements OnInit {

  // selectedId?: string;
  // parks$?: Observable<Park[]>;
  parks: Park[] = [];
  

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getParks();
  }

  getParks(): void {
    this.api.getParks()
    .subscribe(parks => this.parks = parks);
  }

  searchText = '';

}
