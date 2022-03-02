Feature: Setting a Date
As I user
I want to set a date with another user
So that the date informations are stored in somewhere that can remember me and my partner

Scenario: Setting a Date
Given "Charlie" and "Jamie" matched
And agreed in a date through chat
When "Charlie" clicks on "Date" button
And fill the "Date section" with "Saturday, February 26th" "18:30" "Restaurante Cajá"
Then a Date is created with "Waiting partner's Confirmation" status and stored in the Date section of homepage
And Jamie receives a Date notification, with the option to accept or deny


Scenario: Editing Date details
Given "Juan" settled a Date with "Maria", and she accepted
And "Maria" entered the "Date" section and clicked on the date to see "Date Details"
When "Maria" clicks on the edit button
And change Date info to "Friday, February 25th" "7:00 pm" "Outback Rio Mar"
Then the Date Details is updated
And the Date Status change to “Waiting Partner’s Confirmation”
And "Juan" receives a Date Notification, with the option to accept or Deny

Scenario: Canceling a Date
Given "Dolores" and "Roger" settled a Date and accepted
When "Dolores" clicks on the Edit Button
And Clicks in the red option "Cancel Date"
Then the "Date details" is updated to "Date is Canceled"
And "Roger" receives a Date notification
And both of them are no longer available to check "Date Details" for that specific date
<<<<<<< HEAD
And the "date" buttom is now gray
=======
>>>>>>> desenvolvimento

Scenario: Date notification
Given "Bruno" and "Isabela" settled a date
And it's 1 day until the date
When Bruno enters the application
Then he receives a notification remiding him of the date
