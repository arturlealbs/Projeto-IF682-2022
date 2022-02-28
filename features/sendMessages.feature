Feature: Send messages between a matched couple
    As a user that give/receive a match
    I need to be able to chat with the matched person
    So the user can to meet the person

Scenario: Selecting a person to chat
	Given I’m in the “chat page” logged as {JDaniloC}
    And I have {3} chat’s available in the chat’s component
    When I select the {3°} chat
    Then I’m still in the “chats page”
    And I continue seeing {3} chat’s available
    And I can see the messages of the {3°} chat in the page

Scenario: Deleting a chat
	Given I’m in the “chat page” logged as {JDaniloC}
    And I have {3} chat’s available in the chat’s component
    And I’m seeing the messages of the {1°} chat
    When select to delete the chat
    Then I’m still in the “chats page”
    And I see only {2} chat’s available
    And I can’t see the messages of the {1°} chat
    And I the {1°} person can’t send messages to me anymore

Scenario: Seeing when the person is writing a message
	Given I’m in the “chat page” logged as {JDaniloC}
    And I’m seeing the messages of the {1°} chat
    When the another person is writing a message
    Then I can see a text warning that it’s writing

Scenario: Send a message to another person
	Given I’m in the “chat page” logged as {JDaniloC}
    And I’m seeing the messages of the {1°} chat
    When I click in the text field
    And I type the message {“Hello”} and Enter
    Then I’m still in the “chats page”
    And I see the message {“Hello”} in the chat
    And I see the hour of the message