import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;
  list = [
    {
      number: '1',
      name: 'Fonctionnaires',
      icon: 'fa-solid fa-users',
      ro: '/fonctionnaires'

    },
    {
      number: '2',
      name: 'Equipements',
      icon: 'fa-solid fa-screwdriver-wrench',
      ro: '/fonctionnaires/add'

    },]

  ngOnInit(): void {

  }
}