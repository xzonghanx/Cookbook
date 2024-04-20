# Project2 Cookbook

## TRELLO for userstory

- userstory --> must serve a purpose / solve problem
- plan , current/mvp, completed.

## create git repo

edit readme.md

## Deploy and test airtable and api spoonacular in VERCEL

_READ from API spoonacular only._

- make input for search params.
- extract recipes based on search params. (cuisine or name etc)
- filter by cuisine / sort by rating/relevance

_CREATE/UPDATE/DELETE using Airtable._

- clone to favourite.
- add new receipe / update receipt
- delete from favourite / own recipes.

**components**

- APP
- search and results
- Favourites + Personal Recipes Page
- Edit/Create new recipes

**4 props**

- tastescore

**2 useStates**
this is for the fetch recipes:
need to be object {id: , title:, summary: , [ {number: }, {step: }, imgurl, score??]

then POST to favourite
post the above state object + source (online)??
CREATE new recipe (get inputs via a form)
EDIT recipe (PUT/PATCH) via same form? (2 buttons, update or create. check if (reset this idx, dont use the previous id from the fetch) idx === , or name w validation (use regular expression)

**2 react router routes**

- link to favourites/personal recipes
- link to edit page
- link to home/search page.

1 lifting state, which is used to implement CRUD on the client side

## TODO

1. form validation
2. put all API into env file
3. not sure if possible, to enable upload photos.

## env

Airtable Key
patNgXKFRRPf2QElA.c029102eab8c3406ed623f492d02fa098576ef0a6536bc3e320394d1c09b0bc0
using bruno, add the link, then in auth -> bearer token -> get the link from airtable api

API spoonacular.
?apiKey=6ff0206e17fd47b783fabeee52a35974
using bruno, add the link, include apiKey after search param, not as token.
