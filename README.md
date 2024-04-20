# Project2 Cookbook

## Links

UserStory: https://trello.com/invite/b/YTyXgWkq/ATTIb3c653ec5532a6e86f2b4c56c3fe53ac726E9FDA/ga-project2
Vercel:

## Deploy and test airtable and api spoonacular in VERCEL

- link.

_READ from API spoonacular only._

- make input for search params.
- extract recipes based on search params. (cuisine or name etc)
- filter by cuisine / sort by rating/relevance

_CREATE/UPDATE/DELETE using Airtable._

- clone to favourite.
- add new receipe / update receipt
- delete from favourite / own recipes.

- SPOONACULAR API
- for the fetch recipes: check the json format
- need to be object {id: , title:, summary: , [ {number: }, {step: }, imgurl, score??]}
- need to limit API calls

  - use state to store the input and onclick to run the search.
  - useEffect only activates when button clicked rather than when input is keyed.

- then POST to favourite
- post the above state object + source (online)??
- CREATE new recipe (get inputs via a form)
- EDIT recipe (PUT/PATCH) via same form?
- 2 buttons, update or create. check if (reset this idx, dont use the previous id from the fetch) idx === , or name w validation (use regular - expression)

## WireFrame

**components/pages**

- APP

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

## TODO

what other functions to add?

1. form validation
2. put all API into env file
3. not sure if possible, to enable upload photos.
4. figure out why prettier. is not working properly for the jsx/html portion.

## env

Airtable Key
patNgXKFRRPf2QElA.c029102eab8c3406ed623f492d02fa098576ef0a6536bc3e320394d1c09b0bc0
using bruno, add the link, then in auth -> bearer token -> get the link from airtable api

API spoonacular.
?apiKey=6ff0206e17fd47b783fabeee52a35974
using bruno, add the link, include apiKey after search param, not as token.
