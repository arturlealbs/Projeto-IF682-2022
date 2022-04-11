import { Component } from '@angular/core';
import { Rate } from '../types/rate';
import User from '../types/user';

@Component({
  selector: 'app-similar-users',
  templateUrl: './similar-users.component.html',
  styleUrls: ['./similar-users.component.scss']
})
export class SimilarUsersComponent {
  slideConfig = {"slidesToShow": 4, "slidesToScroll": 4}

  constructor() { }
  
  showUserModal = (user: User) => {
    this.userInModal = user;
    const userModal = $('.ui.modal') as any
    userModal.modal("show");

  }

  rateUser = (rate: Rate) => {
    const { user } = rate
    console.log(`You ${rate.action}d ${user?.name}`)
  }

  userInModal?: User;
  users = [
    {
      username: "romero",
      name: "Romero Ramses",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 22,
      education: "ensino médio",
      occupation: "software developer" 
    },
    {
      username: "romero2",
      name: "Romero Cartaxo",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 23.,
      education: "ensino médio",
      occupation: "software developer"
    },
    {
      username: "romero3",
      name: "Romero Bizarria",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 24.,
      education: "ensino médio",
      occupation: "software developer"
    },
    {
      username: "romero",
      name: "Romero Ramses",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 22,
      education: "ensino médio",
      occupation: "software developer" 
    },
    {
      username: "romero2",
      name: "Romero Cartaxo",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 23.,
      education: "ensino médio",
      occupation: "software developer"
    },
    {
      username: "romero3",
      name: "Romero Bizarria",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 24.,
      education: "ensino médio",
      occupation: "software developer"
    },
    {
      username: "romero",
      name: "Romero Ramses",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 22,
      education: "ensino médio",
      occupation: "software developer" 
    },
    {
      username: "romero2",
      name: "Romero Cartaxo",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 23.,
      education: "ensino médio",
      occupation: "software developer"
    },
    {
      username: "romero3",
      name: "Romero Bizarria",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 24.,
      education: "ensino médio",
      occupation: "software developer"
    },
    {
      username: "romero",
      name: "Romero Ramses",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 22,
      education: "ensino médio",
      occupation: "software developer" 
    },
    {
      username: "romero2",
      name: "Romero Cartaxo",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 23.,
      education: "ensino médio",
      occupation: "software developer"
    },
    {
      username: "romero3",
      name: "Romero Bizarria",
      interests: ["soccer"],
      bio: "Essa é uma bio de demonstração bem grande para que eu possa testar um possível overflow de caracteres caso o usuário decida escrever uma redação na bio dele",
      age: 24.,
      education: "ensino médio",
      occupation: "software developer"
    }
]
}
