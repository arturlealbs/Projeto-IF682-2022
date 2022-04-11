Feature: List people that have common interests with the user
As a user of the system 
I Want to see people with interests similar to mine
So that I can get to know them better and potentially meet them


Scenario: User filters other users by preference
    GIVEN I am logged in as a normal user with username {"John"}
    AND {"Anna"} and {"Jessica"} have the {"soccer"} tag
    AND I am at the {"Find people"} page
    WHEN I select the {"soccer"} tag on the {"filter by preference"} element
    THEN I see Anna and Jessica on the list

Scenario: No people with the same preference as the User
    GIVEN I am logged in as a normal user with username {"John"}
    AND I am at the {"Find people"} page
    AND there are 5 users on the platform
    WHEN there are no other users with  the same preferences as mine
    THEN I see the 5 users on the list

Scenario: Person that users likes gets out of the list 
    GIVEN I am logged in as a normal user with username {"John"}
    AND I am at the {"Find people"} page
    AND I see {"Anna"} and {"Jessica"}  on the list
    AND {"Anna"} has not liked my profile yet
    WHEN I like Anna’s profile
    THEN Anna’s profile gets out of the list
    AND Jessica’s profile is still on the list

Scenario: Info message is displayed when there is no people available to the user
    GIVEN I am logged in as a normal user with username {"John"}
    AND I am at the {"Find people"} page
    WHEN there are no users in my list
    THEN I see an info message telling me that there are no users available at the moment

Scenario: User filters other users by preference
    GIVEN I am logged in as a normal user with username “John”
    AND  “Anna” and “Jessica” have “soccer”  in their preference list
    WHEN I ask the system to filter users by the preference “soccer”
    THEN the system returns Anna’s and Jessica’s profiles to my list of users

Scenario: No people with the same preference as the User
    GIVEN I am logged in as a normal user with username “John”
    AND there are 5 users on the database
    WHEN all of the users don’t have any preference that is in my preference list
    THEN the system returns the five profiles to my list of users
    THEN merge conflict

Scenario: Person that users likes matches with him 
    GIVEN I am logged in as a normal user with username {"John"}
    AND I am at the {"Find people"} page
    AND I see {"Anna"} and {"Jessica"} on the list
    AND {"Anna"} has already liked my profile
    WHEN I like Anna’s profile
    THEN Anna’s profile gets out of the list
    AND I receive a popup that I mathed with {"Anna"} and have the ability to chat her
    AND Jessica’s profile is still on the list


Scenario: Person that users dislikes gets out of the list 
    GIVEN I am logged in as a normal user with username {"John"}
    AND I am at the {"Find people"} page
    AND I see {"Anna"} and {"Jessica"}  on the list
    AND {"Anna"} has not liked my profile yet
    WHEN I dislike Anna’s profile
    THEN Anna’s profile gets out of the list
    AND Jessica’s profile is still on the list


