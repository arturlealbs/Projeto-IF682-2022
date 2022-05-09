import { Apollo, QueryRef } from 'apollo-angular';
import { Injectable } from '@angular/core';

import { 
  GetTokenResponse, 
  CreateResponse, 
  Relationships,
  TokenOrError,
  Relationship,
  LikeResponse,
} from '../types/Responses';
import { User } from '../types/User';
import { 
  GET_RELATIONSHIPS,
  GET_TOKEN_QUERY,
  GET_USER_LIST,
  GET_USER,
  CREATE_USER_MUTATION,
  UPDATE_RELATIONSHIP,
  UPDATE_USER,
  LIKE_USER_MUTATION, 
} from '../types/Queries';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private getTokenQuery: QueryRef<GetTokenResponse, {}>;
  private findUserQuery: QueryRef<{ user: User }>;
  private getUsersQuery: QueryRef<{ users: User[] }, {}>;
  private getRelationshipsQuery: QueryRef<Relationships, {}>;

  constructor(private apollo: Apollo) { 
    this.getTokenQuery = this.apollo.watchQuery<GetTokenResponse>({
      query: GET_TOKEN_QUERY,
    });

    this.findUserQuery = this.apollo.watchQuery<{user: User}>({
      query: GET_USER,
    });

    this.getUsersQuery = this.apollo.watchQuery<{users: User[]}>({
      query: GET_USER_LIST,
    });
    
    this.getRelationshipsQuery = this.apollo.watchQuery<Relationships>({
      query: GET_RELATIONSHIPS,
    });
  }

  createUser(user: User) {
    return this.apollo.mutate<CreateResponse>({
      mutation: CREATE_USER_MUTATION,
      variables: { user },
    });
  }
  
  updateRelationship(contactEmail: string, blocked: boolean) {
    return this.apollo.mutate<CreateResponse>({
      mutation: UPDATE_RELATIONSHIP,
      variables: { 
        relationship: {
          contactEmail,
          blocked
        } 
      },
    }).subscribe().unsubscribe();
  }

  updateUser(usersDisliked: string[]) {
    return this.apollo.mutate<CreateResponse>({
      mutation: UPDATE_USER,
      variables: { 
        newUser: {
          usersDisliked
        } 
      },
    }).subscribe().unsubscribe();
  }
  
  likeUser(email: string) {
    return this.apollo.mutate<LikeResponse>({
      mutation: LIKE_USER_MUTATION,
      variables: { 
        likedUser: {
          email
        } 
      },
    });
  }

  

  async getToken(): Promise<TokenOrError> {
    const result = await this.getTokenQuery.refetch();
    return result.data.session;
  }

  async getUser(): Promise<User> {
    const result = await this.findUserQuery.refetch();
    return result.data.user;
  }

  async findAll(): Promise<User[]> {
    const result = await this.getUsersQuery.refetch();
    return result.data.users;
  }
  
  async getContacts(): Promise<Relationship[]> {
    const result = await this.getRelationshipsQuery.refetch();
    return result.data.relationships;
  }
}
