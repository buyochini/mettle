Feature: Poke Search
  As a user of product owner
  I should be able to search for various poke items
  so i can view the information about search on the page

  Scenario Outline: Searching with non alphabetical characters <searchValue>
    Given I GET a search for "<searchValue>"
    Then I should receive a 200 HTTP response from poke-search
    And An error message stating "Invalid search term"

    Examples:
      | searchValue |
      | PokéDex!    |
      | 123456678   |

  Scenario: Searching with non available content
    Given I GET a search for "Bbc"
    Then I should receive a 200 HTTP response from poke-search
    And An error message stating "No Pokémon found!"

  Scenario: Searching with a valid content
    Given I GET a search for "aron"
    Then I should receive a 200 HTTP response from poke-search
    And A successful response should be received

  @uat
  Scenario Outline: View result information for <searchValue>
    Given I GET a search for "<searchValue>"
    Then I should receive a 200 HTTP response from poke-search
    And A successful response should be received
    When I retrieve the information of a result
    Then I should receive a 200 HTTP response from poke-search
    And A successful result response should be received

    Examples:
      | searchValue |
      | pangoro     |
      | goldeen     |
      | roselia     |