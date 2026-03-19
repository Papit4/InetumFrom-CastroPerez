Feature: User Authentication
  As a user of Sauce Demo
  I want to be able to log in to the application
  So that I can access the product catalog

  Background:
    Given I am on the Sauce Demo login page

  Scenario: Successful login with valid credentials
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the products page
    And I should see the products inventory

  Scenario: Failed login with locked out user
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."

  Scenario: Failed login with invalid credentials
    When I login with username "invalid_user" and password "wrong_password"
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"