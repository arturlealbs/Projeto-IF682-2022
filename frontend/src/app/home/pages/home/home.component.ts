import { Component, OnInit } from '@angular/core';
import { HomeFacade } from 'src/app/home/home.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private readonly homeFacade: HomeFacade,
  ) { }

  ngOnInit(): void {
  }

}
