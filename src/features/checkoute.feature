Feature: Checkout Process
  As a user with items in my cart
  I want to complete the checkout process
  So that I can purchase my selected products

  Background:
    Given I am logged in as "standard_user"
    And I have added "Sauce Labs Backpack" to the cart
    And I am on the cart page

  Scenario: Complete checkout with valid information
    When I click on checkout
    And I fill in the checkout information:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I click continue
    And I click finish
    Then I should see the order confirmation message "Thank you for your order!"
    And I should see the "Back Home" button

  Scenario: Cannot proceed checkout without required information
    When I click on checkout
    And I click continue without filling information
    Then I should see an error message "Error: First Name is required"

  Scenario: Verify order summary before completing purchase
    When I click on checkout
    And I fill in the checkout information:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I click continue
    Then I should see the checkout summary page
    And I should see "Sauce Labs Backpack" in the order summary
    And I should see the total price including tax