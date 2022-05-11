import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HomeState } from './state/home.state';
import { HomeApi } from './api/home.api';

import { User } from '../shared/types/User';

@Injectable()
export class HomeFacade {
  constructor(
    private readonly state: HomeState,
    private readonly api: HomeApi
  ) {}

  getProfile(): Observable<User | null> {
    return this.state.getProfile();
  }

  setProfile(profile: User) {
    this.state.setProfile(profile);
  }

  getFacebookProfileData(facebookID: string, accessToken: string) {
    return this.api
      .getFacebookData(facebookID, accessToken)
      .subscribe((data) => {
        const profile = this.state.getCurrentProfile();
        if (profile) {
          this.setProfile({
            ...profile,
            gender: data.gender.toUpperCase(),
            birthDate: data.birthday,
            age: data.age_range.min,
            profileImg: data.picture.data.url,
          });
        }
      });
  }

  getCurrentProfile(): User | null {
    return this.state.getCurrentProfile();
  }

  getGoogleProfileData(accessToken: string) {
    return this.api.getGoogleData(accessToken).subscribe((data) => {
      const profile = this.state.getCurrentProfile();
      const resizedImage = data.picture.slice(0, data.picture.length - 6);
      if (profile) {
        this.setProfile({
          ...profile,
          profileImg: resizedImage,
        });
      }
    });
  }

  updateImageProfile(user: any, loginToken: string) {
    if (user.provider === 'GOOGLE') {
      return this.getGoogleProfileData(loginToken);
    }
    return this.getFacebookProfileData(user.id, loginToken);
  }

  translateInterests: { [key: string]: string } = {
    ART: 'Arte',
    FOOD: 'Comida',
    DANCE: 'Dança',
    GAMES: 'Jogos',
    BOOKS: 'Livros',
    MUSIC: 'Música',
    FASHION: 'Moda',
    HEALTH: 'Saúde',
    BEAUTY: 'Beleza',
    MOVIES: 'Filmes',
    TRAVEL: 'Viagens',
    SOCCER: 'Futebol',
    CULTURE: 'Cultura',
    SPORTS: 'Esportes',
    ARTISTS: 'Artistas',
    HISTORY: 'História',
    ECONOMY: 'Economia',
    FINANCE: 'Finanças',
    COOKING: 'Culinária',
    LANGUAGES: 'Idiomas',
    BUSINESS: 'Negócios',
    POLITICS: 'Política',
    RELIGION: 'Religião',
    BASKETBALL: 'Basquete',
    GEOGRAPHY: 'Geografia',
    PHILOSOPHY: 'Filosofia',
    TECHNOLOGY: 'Tecnologia',
    LITERATURE: 'Literatura',
    PHOTOGRAPHY: 'Fotografia',
  };
}
