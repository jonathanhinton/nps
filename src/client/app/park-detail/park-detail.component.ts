import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Park } from '../shared/park.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-park-detail',
  templateUrl: './park-detail.component.html',
  styleUrls: ['./park-detail.component.scss']
})
export class ParkDetailComponent implements OnInit {
  park: Park | undefined;
  images: Park["images"] | undefined;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPark();
  }

  getPark(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getPark(id)
      .subscribe(park => this.park = park);
  }

  goBack(): void {
    this.location.back();
  }

}
