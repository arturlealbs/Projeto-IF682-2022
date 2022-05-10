import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


import { ListUsersState } from './state/list-users.state';

import { defaultUser, User } from '../shared/types/User';
import { Rate } from './types/rate';
import { UsersService } from '../shared/services/users.service';
import { ChatsFacade } from '../chats/chats.facade';
import { ProfileService } from '../shared/services/profile.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Injectable()
export class ListUsersFacade {
  currentProfile: User = defaultUser;
  alertClass: BehaviorSubject<string> = new BehaviorSubject<string>('hide');
  users: User[] = [];

	constructor(
		private readonly state: ListUsersState,
    private userService: UsersService,
    private chatsFacade: ChatsFacade,
    private profileService: ProfileService,
    private notificationService: NotificationService
	) {
    this.profileService.getProfile().subscribe((data) => {
      if (data) {
        this.currentProfile = data
      }
    })
  }

  getUserList(): Observable<User[]> {
      return this.state.getUserList();
  }

  setUserList(userList: User[]) {
    this.state.setUserList(userList);
  }

  matchPopUp() {
    this.alertClass.next('show showAlert');
    setTimeout(() => {
      this.alertClass.next('hide showAlert');
    },5000);
  };

  async rateUser (rate: Rate) {
    const { user } = rate;
    if (!user?.email) return;
    
    let { usersDisliked } = this.currentProfile;
    if (rate.action === 'like') {
      this.userService.likeUser(user.email).subscribe(({ data }) => {
        if (data && data.likeUser) {
          this.chatsFacade.fetchContacts();
          this.notificationService.sendNotification({
            to: user.email,
            image: user.profileImg,
            timestamp: new Date().toLocaleString(),
            text: `Você e ${user.username} deram Match!`
          });
          this.matchPopUp()
        }
      });

      const newUser = await this.userService.getUser();
      this.profileService.setProfile(newUser);
    } else {
      usersDisliked = [...usersDisliked, user.email]
      this.userService.updateUser({
        usersDisliked,
      }); 
      this.profileService.setProfile({
        ...this.currentProfile, usersDisliked
      })
    }
    this.users = this.users.filter(u => u !== user);
  };
}
