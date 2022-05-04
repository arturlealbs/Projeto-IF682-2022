import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../shared/services/profile.service';
import { defaultUser, User } from '../../../shared/types/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public profile: User = defaultUser;

  constructor(profileService: ProfileService) {
    profileService.getProfile().subscribe(profile => {
      if (!profile) return;
      this.profile = profile;
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
}
