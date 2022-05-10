import { Component, OnInit, ViewChild } from '@angular/core';

import { defaultUser, User } from 'src/app/shared/types/User';
import { UsersService } from 'src/app/shared/services/users.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { HomeFacade } from '../../home.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile: User = defaultUser;
  public displayInputs = [
    "firstName", "lastName", "gender", "age", "occupation",
    "education", "bio", "interests", "city", "state", 
    "address", "birthDate", "phoneNumber", "genderOfInterest"
  ]

  public popupLabel: string = 'Perfil atualizado!';
  public translateInterests = this.homeFacade.translateInterests
  @ViewChild(PopupComponent) child!:PopupComponent;

  constructor(
    private profileService: ProfileService,
    private usersService: UsersService,
    private homeFacade: HomeFacade
  ) {
    profileService.getProfile().subscribe(profile => {
      if (!profile) return;
      this.profile = {...profile};
    });
  }

  ngOnInit(): void {
  }

  capitalizedName(): string {
    return this.profile.username.split(" ").map(
      (name) => name.charAt(0).toUpperCase() + name.slice(1)
    ).join(" ");
  }

  getGender(gender: string | undefined): string {
    return gender === "MALE" ? "Masculino" : 
           gender === "FEMALE" ? "Feminino": "Bisexual";
  }
  
  getEducation(): string | undefined {
    if (!this.profile.education) {
      return
    }
    switch (this.profile.education) {
      case "ensinoFundamental":	
        return "Ensino Fundamental";
      case "ensinoMedio":	
        return "Ensino Médio";
      case "cursoTecnico":	
        return "Ensino Técnico";
      default:
        return this.profile.education?.charAt(0).toUpperCase() + 
          this.profile.education.slice(1);
    }
  }

  getAge() {
    var today = new Date();
    var birthDate = new Date(this.profile.birthDate || "");
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  async updateUser(user: User) {
    this.usersService.updateUser({
      age: user.age,
      bio: user.bio,
      city: user.city,
      state: user.state,
      gender: user.gender,
      address: user.address,
      lastName: user.lastName,
      birthDate: user.birthDate,
      education: user.education,
      firstName: user.firstName,
      interests: user.interests,
      languages: user.languages,
      occupation: user.occupation,
      phoneNumber: user.phoneNumber,
      genderOfInterest: user.genderOfInterest,
    });
    this.profileService.setProfile(user);
    this.child.showPopUp();
  }
}
