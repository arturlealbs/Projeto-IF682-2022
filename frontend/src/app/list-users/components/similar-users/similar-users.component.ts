import { Component, Input } from '@angular/core';
import { Rate } from '../../types/rate';
import { defaultUser, User } from 'src/app/shared/types/User';
import { FuiModalService } from 'ngx-fomantic-ui';
import { ModalDetails } from '../modal-details/modal-details.component';
import { UsersService } from 'src/app/shared/services/users.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-similar-users',
  templateUrl: './similar-users.component.html',
  styleUrls: ['./similar-users.component.scss'],
})
export class SimilarUsersComponent {
  @Input()
  users: User[] = [];

  userInModal?: User;
  currentProfile: User = defaultUser;

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  constructor(public modalService: FuiModalService,
              public userService: UsersService,
              public profileService: ProfileService
            ) {

              this.profileService.getProfile().subscribe((data) => {
                if (data) {
                  this.currentProfile = data
                }
              })
            }

  showUserModal = (user: User) => {
    this.modalService
      .open(
        new ModalDetails(
          user
        )
      )
  };


  async rateUser (rate: Rate) {
    const { user } = rate;
    console.log(`You ${rate.action}d ${user?.username}`);
    if (rate.action === 'like' && user?.email) {
      let {usersDisliked, usersLiked} = this.currentProfile
      console.log(usersDisliked, usersLiked)
      usersLiked = usersLiked.concat(user.email)
      this.userService.updateUser(
        usersLiked, usersDisliked
      )
        console.log((await this.userService.getUser()).usersLiked)
      }
      
      console.log("weird")
      
    this.users = this.users.filter(u => u !== user)

  };
}
