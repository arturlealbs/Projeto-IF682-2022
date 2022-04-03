import { registerEnumType } from '@nestjs/graphql';

enum Education {
  ensinoFundamental = 'ensinoFundamental',
  ensinoMedio = 'ensinoMedio',
  cursoTecnico = 'cursoTecnico',
  bacharelado = 'bacharelado',
  licenciatura = 'licenciatura',
  mestrado = 'mestrado',
  doutorado = 'doutorado',
}

registerEnumType(Education, {
  name: 'Education',
  description: 'The education levels.',
});

export { Education };
