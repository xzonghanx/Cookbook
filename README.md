# Project2 Cookbook

Whats for Dinner?!!?!?!!?!!?!

## Links

UserStory: https://trello.com/invite/b/YTyXgWkq/ATTIb3c653ec5532a6e86f2b4c56c3fe53ac726E9FDA/ga-project2
Vercel: https://cookbook-nom5q8zp1-zonghans-projects-5edc3094.vercel.app

## WireFrame

**notes**
_READ from API spoonacular only._

- make input for search params.
- extract recipes based on search params. (cuisine or name etc)
- filter by cuisine / sort by rating/relevance

_CREATE/UPDATE/DELETE using Airtable._

- clone to favourite.
- add new receipe / update receipt
- delete from favourite / own recipes.

_SPOONACULAR API_

- for the fetch recipes: check the json format
- need to be object {id: , title:, summary: , [ {number: }, {step: }, imgurl, score??]}
- need to limit API calls

  - use state to store the input and onclick to run the search.
  - useEffect only activates when button clicked rather than when input is keyed.

_AIRTABLE_

- post the above state object + source (online)??
- CREATE new recipe (get inputs via a form)
- EDIT recipe (PUT/PATCH) via same form?
- 2 buttons, update or create. check if (reset this idx, dont use the previous id from the fetch) idx === , or name w validation (use regular - expression)

**components**

- APP

  - mainpage here. group components.
  - add routes to edit page/ searchpage etc.

- Search and results

  - input bar
  - output container for results

- Favourites + Personal Recipes Page

  - output container for favourites/personal recipes
  - sort/filter function

- Edit/Create new recipes

  - form/fieldset for each params
  - setState on submit

**useStates; lifting state, which is used to implement CRUD on the client side; props**

- search params as a state, fetch in Search Results Page
  - lifted to APP(main) to push to Favourites page.
- edit recipes page
  - lifted to APP(main) to push to Personal Page

**2 react router routes**

- link to favourites/personal recipes
- link to edit page
- link to home/search page.

## ICEBOX

what other functions to add?
