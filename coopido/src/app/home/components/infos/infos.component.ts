import { Component, Input, OnInit } from '@angular/core';
import { Infos } from '../../types/infos';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit {

  @Input()
  infos!: Infos;

  constructor() { }

  ngOnInit(): void {
  }

}
