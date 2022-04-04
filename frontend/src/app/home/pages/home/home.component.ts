import { Component, OnInit } from '@angular/core';
import { HomeFacade } from 'src/app/home/home.facade';
import { Infos } from '../../types/infos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string = 'HomeComponent';
  infos!: Infos;

  constructor(
    private readonly homeFacade: HomeFacade,
  ) { 
    this.homeFacade.fetchInfos("pikachu");
    this.homeFacade.getInfos().subscribe(infos => {
      this.infos = infos;
    });
  }

  ngOnInit(): void {
  }

}
