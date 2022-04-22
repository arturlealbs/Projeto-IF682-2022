import { Apollo, QueryRef } from 'apollo-angular';
import { Injectable } from '@angular/core';

import { User } from '../types/User';
import { 
  GET_USER_BY_EMAIL_OR_USERNAME_QUERY, 
  GET_USER_LIST
} from '../types/Queries';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private findUserQuery: QueryRef<{user: User}, { 
    email?: String, username?: String
  }>;

  private getUsersQuery: QueryRef<{users: User[]}, {}>;

  constructor(private apollo: Apollo) { 
    this.findUserQuery = this.apollo.watchQuery<{user: User}>({
      query: GET_USER_BY_EMAIL_OR_USERNAME_QUERY,
    });

    this.getUsersQuery = this.apollo.watchQuery<{users: User[]}>({
      query: GET_USER_LIST,
    });
  }

  async findUsers(email?: string, username?: string): Promise<User> {
    const result = await this.findUserQuery.refetch({ email, username });
    return result.data.user;
  }

  async findAll(): Promise<User[]> {
    const result = await this.getUsersQuery.refetch();
    return result.data.users;
  }
}
