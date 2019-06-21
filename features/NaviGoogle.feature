#language: en

@example
Feature: Navigate to Google
    I wanna navigate in the google and to make some search


    Scenario Outline: Search texts in google.com website
        Given Im on the page
        When I fill in the text field with "<name>"
        Then I click and my search return something about this "<name>!" was successfully validated

        Examples:
            | name               |
            | Ford               |
            | Cucumber BDD       |
            | Protractor Angular |