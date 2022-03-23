/* eslint-disable prettier/prettier */

import { registerEnumType } from '@nestjs/graphql';

enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

enum Education {
  ensinoFundamental = "ensinoFundamental",
  ensinoMedio = "ensinoMedio",
  cursoTecnico = "cursoTecnico",
  bacharelado = "bacharelado",
  licenciatura = "licenciatura",
  mestrado = "mestrado",
  doutorado = "doutorado",
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'The biological gender.',
});

registerEnumType(Education, {
  name: 'Education',
  description: 'The education levels.',
});

export { Gender, Education }