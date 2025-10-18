Feature: Auth 
  As a user, I want to be able to log in and log out of the application
  securely, so that I can access my personal account and data.

  Background:
    Given the application is running
  Scenario: User login
    Given the user is on the login page
    When the user enters valid credentials
    Then the user should be redirected to the dashboard
  Scenario: User logout
    Given the user is logged in
    When the user clicks the logout button
    Then the user should be redirected to the homepage
  Scenario: Invalid login attempt
    Given the user is on the login page
    When the user enters invalid credentials
    Then an error message should be displayed
