Feature: List people that have common interests with the user
As a user of the system 
I Want to see people with interests similar to mine
So that I can get to know them better and potentially meet them


Scenario: User filters other users by preference
    Given I am logged in as a normal user with username {"John"}
    And {"Anna"} and {"Jessica"} have the {"soccer"} tag
    And I am at the {"Find people"} page
    When I select the {"soccer"} tag on the {"filter by preference"} element
    Then I see Anna and Jessica on the list

Scenario: No people with the same preference as the User
    Given I am logged in as a normal user with username {"John"}
    And I am at the {"Find people"} page
    And there are 5 users on the platform
    When there are no other users with  the same preferences as mine
    Then I see the 5 users on the list

Scenario: Person that users likes gets out of the list 
    Given I am logged in as a normal user with username {"John"}
    And I am at the {"Find people"} page
    And I see {"Anna"} and {"Jessica"}  on the list
    And {"Anna"} has not liked my profile yet
    When I like Anna’s profile
    Then Anna’s profile gets out of the list
    And Jessica’s profile is still on the list

Scenario: Info message is displayed when there is no people available to the user
    Given I am logged in as a normal user with username {"John"}
    And I am at the {"Find people"} page
    When there are no users in my list
    Then I see an info message telling me that there are no users available at the moment

Scenario: User filters other users by preference
    Given I am logged in as a normal user with username “John”
    And  “Anna” and “Jessica” have “soccer”  in their preference list
    When I ask the system to filter users by the preference “soccer”
    Then the system returns Anna’s and Jessica’s profiles to my list of users

Scenario: No people with the same preference as the User
    Given I am logged in as a normal user with username “John”
    And there are 5 users on the database
    When all of the users don’t have any preference that is in my preference list
    Then the system returns the five profiles to my list of users 
    And the database does not change

Scenario: Person that users likes matches with him 
    Given I am logged in as a normal user with username {"John"}
    And I am at the {"Find people"} page
    And I see {"Anna"} and {"Jessica"} on the list
    And {"Anna"} has already liked my profile
    When I like Anna’s profile
    Then Anna’s profile gets out of the list
    And I receive a popup that I mathed with {"Anna"} and have the ability to chat her
    And Jessica’s profile is still on the list


Scenario: Person that users dislikes gets out of the list 
    Given I am logged in as a normal user with username {"John"}
    And I am at the {"Find people"} page
    And I see {"Anna"} and {"Jessica"}  on the list
    And {"Anna"} has not liked my profile yet
    When I dislike Anna’s profile
    Then Anna’s profile gets out of the list
    And Jessica’s profile is still on the list


