import { Apollo, QueryRef } from 'apollo-angular';
import { Injectable } from '@angular/core';

import { getTokenResponse, createResponse, TokenOrError } from '../types/Responses';
import { User } from '../types/User';
import { 
  GET_USER_BY_EMAIL_OR_USERNAME_QUERY, 
  CREATE_USER_MUTATION,
  GET_TOKEN_QUERY,
  GET_USER_LIST
} from '../types/Queries';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private getTokenQuery: QueryRef<getTokenResponse, {}>;
  private findUserQuery: QueryRef<{ user: User }, { 
    email?: String, username?: String
  }>;

  private getUsersQuery: QueryRef<{ users: User[] }, {}>;

  constructor(private apollo: Apollo) { 
    this.getTokenQuery = this.apollo.watchQuery<getTokenResponse>({
      query: GET_TOKEN_QUERY,
    });

    this.findUserQuery = this.apollo.watchQuery<{user: User}>({
      query: GET_USER_BY_EMAIL_OR_USERNAME_QUERY,
    });

    this.getUsersQuery = this.apollo.watchQuery<{users: User[]}>({
      query: GET_USER_LIST,
    });
  }

  createUser(user: User) {
    return this.apollo.mutate<createResponse>({
      mutation: CREATE_USER_MUTATION,
      variables: { user },
    });
  }

  async getToken(): Promise<TokenOrError> {
    const result = await this.getTokenQuery.refetch();
    return result.data.session;
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
