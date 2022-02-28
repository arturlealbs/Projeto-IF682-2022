Feature: Match Notification
As a user
I want to receive a notification when a Match with other user happens
So I can know when a match has occured and I can start interacting with the other user

Scenario: Direct Match
Given the system recommended "Charlie" to "Jamie" 
And "Jamie" liked him
And the system recommended "Jamie" to "Charlie"
When "Charlie" liked "Jamie"
Then Charlie receives a match notification
And Jamie receives a match notification
And both of them are available to chat with each other

Scenario: Indirect Match
Given “Susan” searched “Matheus” and liked him
When “Matheus” searched “Susan” 
And “Matheus” liked her
Then Susan receives a match notification
And Matheus receives a match notification
And both of them are available to chat with each other

Scenario: Deleting Notifications
Given I'm in the home page
And click on the notification tab
When I click on the "x" button on the right side of the notification
Then the notification is deleted

