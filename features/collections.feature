Feature: Collections
  As a user,
  I want to manage my collections of items,
  so that I can organize and access them easily.

  Background:
    Given the application is running

  Scenario: Create a new collection
    Given the user is on the collections page
    When the user creates a new collection named "My Books"
    Then the collection "My Books" should be listed on the collections page

  Scenario: Delete a collection
    Given the user has a collection named "My Books"
    When the user deletes the collection "My Books"
    Then the collection "My Books" should no longer be listed on the collections page

  Scenario: Access a collection
    Given the user has a collection named "My Books"
    When the user selects the collection "My Books"
    Then the user should navigate to the collection details page for "My Books"

