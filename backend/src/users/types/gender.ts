/* eslint-disable prettier/prettier */

import { registerEnumType } from '@nestjs/graphql';

enum Gender {
  MALE = 'male',
  BOTH = 'both',
  FEMALE = 'female',
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'The biological gender.',
});

export { Gender };
