Feature: Create and acess my account
    As a system user
    I want to create and access my account
    In order to have access to my personal settings

Scenario: Create an account
    Given I'm at the {"Sign in"} page
    And I fill in the fields with all the necessary information
    When I select the {"Sign in"} button
    Then I create my account

Scenario: Already exist error
    Given I'm at the {"Sign in"} page
    And I fill in the fields with all the necessary information
    When my {"Email"} or my {"CPF"} already exist in the system
    Then I get a prompt on the screen requesting the change

Scenario: Success registration screen
    Given I'm at the {"Sign in"} page
    When I finish creating the account {"John"}
    Then I'm redirected to the {"Registration Success"} page
    And I can see the preview of {"John"} profile

Scenario: Login to my account
    Given I'm on {“Login Screen”} page
    And I want to log into my account {"John"}
    And I fill the fields {"Email"} and {"Password"} correctly
    When I select the {"Sign in"} button
    Then I'm on {“Home”} page