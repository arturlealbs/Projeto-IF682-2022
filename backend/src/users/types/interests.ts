import { registerEnumType } from '@nestjs/graphql';

export enum Interests {
  ART = 'arte',
  FOOD = 'comida',
  DANCE = 'dança',
  GAMES = 'jogos',
  BOOKS = 'livros',
  MUSIC = 'música',
  FASHION = 'moda',
  HEALTH = 'saúde',
  BEAUTY = 'beleza',
  MOVIES = 'filmes',
  TRAVEL = 'viagens',
  SOCCER = 'futebol',
  CULTURE = 'cultura',
  SPORTS = 'esportes',
  ARTISTS = 'artistas',
  HISTORY = 'história',
  ECONOMY = 'economia',
  FINANCE = 'finanças',
  COOKING = 'culinária',
  LANGUAGES = 'idiomas',
  BUSINESS = 'negócios',
  POLITICS = 'política',
  RELIGION = 'religião',
  BASKETBALL = 'basquete',
  GEOGRAPHY = 'geografia',
  PHILOSOPHY = 'filosofia',
  TECHNOLOGY = 'tecnologia',
  LITERATURE = 'literatura',
  PHOTOGRAPHY = 'fotografia',
}

registerEnumType(Interests, {
  name: 'Interests',
  description: 'The interests list.',
});
