import { 
  Component, 
  EventEmitter, 
  Input,
  OnInit, 
  Output, 
  ViewChild 
} from '@angular/core';

import { defaultUser, User } from 'src/app/shared/types/User';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() public profile: User = defaultUser;

  @Input() displayInputs: string[] = [
    "username", "firstName", "lastName", 
    "email", "gender", "age", "occupation",
    "education", "bio", "interests", "city",
    "state", "address", "birthDate", "phoneNumber",
    "genderOfInterest"
  ];
  @Input() actionLabel: string = 'Cadastrar';
  @Output() onSubmit = new EventEmitter<User>();

  translateInterests: {[key: string]: string} = {
    'ART': 'arte',
    'FOOD': 'comida',
    'DANCE': 'dança',
    'GAMES': 'jogos',
    'BOOKS': 'livros',
    'MUSIC': 'música',
    'FASHION': 'moda',
    'HEALTH': 'saúde',
    'BEAUTY': 'beleza',
    'MOVIES': 'filmes',
    'TRAVEL': 'viagens',
    'SOCCER': 'futebol',
    'CULTURE': 'cultura',
    'SPORTS': 'esportes',
    'ARTISTS': 'artistas',
    'HISTORY': 'história',
    'ECONOMY': 'economia',
    'FINANCE': 'finanças',
    'COOKING': 'culinária',
    'LANGUAGES': 'idiomas',
    'BUSINESS': 'negócios',
    'POLITICS': 'política',
    'RELIGION': 'religião',
    'CHILDREN': 'crianças',
    'BASKETBALL': 'basquete',
    'GEOGRAPHY': 'geografia',
    'PHILOSOPHY': 'filosofia',
    'TECHNOLOGY': 'tecnologia',
    'LITERATURE': 'literatura',
    'PHOTOGRAPHY': 'fotografia',
  }

  interests: string[] = [
    'ART', 'FOOD', 'DANCE', 'GAMES', 'BOOKS', 'MUSIC', 
    'FASHION', 'HEALTH', 'BEAUTY', 'MOVIES', 'TRAVEL', 
    'SOCCER', 'CULTURE', 'SPORTS', 'ARTISTS', 'HISTORY', 
    'ECONOMY', 'FINANCE', 'COOKING', 'LANGUAGES', 'BUSINESS', 
    'POLITICS', 'RELIGION', 'CHILDREN', 'BASKETBALL', 
    'GEOGRAPHY', 'PHILOSOPHY', 'TECHNOLOGY', 'LITERATURE', 'PHOTOGRAPHY',
  ]

  selectInput = {
    value: ''
  }

  error: string = '';
  @ViewChild(PopupComponent) child!:PopupComponent;
  
  constructor() { }

  ngOnInit(): void {
  }

  translateInterest(interest: string): string {
    return this.translateInterests[interest];
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    let error = '';
    if (this.profile.username === "") {
      error = 'O nome de usuário é obrigatório';
    } else if (this.profile.firstName === "") {
      error = 'O nome é obrigatório';
    } else if (this.profile.lastName === "") {
      error = 'O sobrenome é obrigatório';
    } else if (!this.profile.age) {
      error = 'A idade é obrigatória';
    } else if (this.profile.birthDate === "") {
      error = 'A data de nascimento é obrigatória';
    } else if (this.profile.city === "") {
      error = 'A cidade é obrigatória';
    } else if (this.profile.state === "") {
      error = 'O estado é obrigatório';
    } else if (this.profile.address === "") {
      error = 'O endereço é obrigatório';
    } else if (this.profile.genderOfInterest === "") {
      error = 'O gênero de interesse é obrigatório';
    } else if (this.profile.gender === "") {
      error = 'O gênero é obrigatório';
    }

    if (error !== '') {
      this.error = error;
      return this.child.showPopUp();
    }
    this.onSubmit.emit(this.profile);
  }

  addInterest(interest: string): void {
    if (interest === "") return;
    this.selectInput.value = interest;
    this.interests.splice(this.interests.indexOf(interest), 1);
    this.profile.interests = [...this.profile.interests, interest];
  }

  removeInterest(interest: string): void {
    if (interest === "") return;
    this.profile.interests = this.profile.interests.filter(
      (value) => value !== interest);
    this.interests = [...this.interests, interest];
  }
}
