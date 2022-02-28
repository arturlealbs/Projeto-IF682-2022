Feature: Show profile
AS A user 
I WANT to see more informations about other user 
SO THAT I can know more about the other user

Scenario: Getting more information about an user

    Given that I’m at the “Users List” page
    And I want to know more about the user “John”

    When I click to go see more informations about “John”

    Then I’m at the ““John More Informations” page
    And I can see more details about the profile of “John”

Scenario: Returning to Users List Page

    Given I’m at the “ “More Informations” page
    And I want to return to the “Users List” page


    When I clicked to return to “Users List” Page
    
    Then I’m at the “Users List” page
    And I can see the list of users with less information 

Scenario: Seeing better the picture of an user

    Given I’m at the “John More Informations” page
    And I want to see better a picture of the user “John”


    When I clicked in this picture
    
    Then I’m at the “John’s Picture” page
    And I can see John's picture bigger than the other one 



Scenario: Reporting an user

    Given I’m at the “John More Informations” page
    And I see that John’s profile has an unappropriated description


    When I clicked to report his profile
    
    Then I’m at the “Report” page
    And I can choose a reason that I want to report John
    And I can confirm and report John’s profile

Scenario: Storing personal information on the system
    Given I am at the register page

    When I fill all the informations that is required by the system to register
    And I click to register me

    Then I am at home page
    And all the informations are stored on the system

Scenario: Edit personal information on the system
    Given I am at my personal profile page

    When I click to edit my description
    And I change the text of my description (characteristics about me)
    And I click to save these changes

    Then I am at my personal profile page
    And all changes are stored on the system

Scenario: Storing personal information on the system
    Given I am at the register page

    When I fill some of the informations that is required by the system to register
    And I click to register me

    Then I receive a message that I can't register me because I not filled all the mandatory informations

Scenario: Edit personal information on the system
    Given I am at my personal profile page

    When I click to edit my description
    And I change the text of my description (characteristics about me)

    Then I receive a error message because I didn't save the new informations
    And I'm in my the personal profile page
