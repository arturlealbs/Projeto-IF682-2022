import { Component } from '@angular/core';
import { Rate } from '../types/rate';
import User from '../types/user';
import { FuiModalService } from 'ngx-fomantic-ui';
import { ModalDetails } from '../modal-details/modal-details.component';

@Component({
  selector: 'app-similar-users',
  templateUrl: './similar-users.component.html',
  styleUrls: ['./similar-users.component.scss'],
})
export class SimilarUsersComponent {
  constructor(public modalService: FuiModalService) {}
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  showUserModal = (user: User) => {
    this.modalService
      .open(
        new ModalDetails(
          user
        )
      )
  };

  rateUser = (rate: Rate) => {
    const { user } = rate;
    console.log(`You ${rate.action}d ${user?.name}`);
  };

  userInModal?: User;
  users = [
    {
      username: 'romero',
      name: 'Romero Ramses',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 22,
      education: 'ensino médio',
      occupation: 'software developer',
    },
    {
      username: 'romero2',
      name: 'Romero Cartaxo',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 23,
      education: 'ensino médio',
      occupation: 'software developer',
    },
    {
      username: 'romero3',
      name: 'Romero Bizarria',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 24,
      education: 'ensino médio',
      occupation: 'software developer',
    },
    {
      username: 'romero',
      name: 'Romero Ramses',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 22,
      education: 'ensino médio',
      occupation: 'software developer',
    },
    {
      username: 'romero2',
      name: 'Romero Cartaxo',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 23,
      education: 'ensino médio',
      occupation: 'software developer',
    },
    {
      username: 'romero3',
      name: 'Romero Bizarria',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 24,
      education: 'ensino médio',
      occupation: 'software developer',
    },
    {
      username: 'romero',
      name: 'Romero Ramses',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 22,
      education: 'ensino médio',
      occupation: 'software developer',
    },
    {
      username: 'romero2',
      name: 'Romero Cartaxo',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 23,
      education: 'ensino médio',
      occupation: 'software developer',
    },
    {
      username: 'romero3',
      name: 'Romero Bizarria',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 24,
      education: 'ensino médio',
      occupation: 'software developer',
    },
    {
      username: 'romero',
      name: 'Romero Ramses',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 22,
      education: 'ensino médio',
      occupation: 'software developer',
    },
    {
      username: 'romero2',
      name: 'Romero Cartaxo',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 23,
      education: 'ensino médio',
      occupation: 'software developer',
    },
    {
      username: 'romero3',
      name: 'Romero Bizarria',
      interests: ['soccer'],
      bio: 'Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele',
      age: 24,
      education: 'ensino médio',
      occupation: 'software developer',
    },
  ];
}
