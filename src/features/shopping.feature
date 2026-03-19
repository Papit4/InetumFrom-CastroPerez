Feature: Shopping Cart Management
  As a logged-in user
  I want to add products to my cart
  So that I can purchase them later

  Background:
    Given I am logged in as "standard_user"
    And I am on the products page

  Scenario: Add a single product to cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"
    And the product should be added to the cart

  Scenario: Add multiple products to cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2"

  Scenario: View products in cart
    When I add "Sauce Labs Backpack" to the cart
    And I click on the shopping cart
    Then I should see "Sauce Labs Backpack" in the cart
    And I should see the correct price for "Sauce Labs Backpack"

  Scenario: Remove product from cart
    When I add "Sauce Labs Backpack" to the cart
    And I click on the shopping cart
    And I remove "Sauce Labs Backpack" from the cart
    Then the cart should be empty