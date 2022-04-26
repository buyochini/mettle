Feature: Poke Search
  As a user of product owner
  I should be able to search for various poke items
  so i can view the information about search on the page

  Background:
    Given I launch the poke search website

  Scenario Outline: Searching with non alphabetical characters "<searchValue>
    When I search using "<searchValue>"
    Then An error message will be displayed reading "Invalid search term"

    Examples:
      | searchValue |
      | PokéDex!    |
      | 123456678   |

  Scenario: Searching with non available content
    When I search using "bbc"
    Then An error message will be displayed reading "No Pokémon found!"

  Scenario: Searching with a valid content
    When I search using "aron"
    Then A list of valid results should be displayed

  Scenario Outline: View result information for <searchValue>
    When I search using "<searchValue>"
    Then A list of valid results should be displayed
    When I select a result
    Then The user should be on the result page
    And The below information sections should be displayed
      | name | picture | description | stats | evolution |
      | name | picture | description | stats | evolution |

    Examples:
      | searchValue |
      | hattrem     |
      | beautify    |
      | mew         |