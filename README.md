A react app to randomly pick a movie.

In order to setup and start the server, clone this repo and run "npm install" in the root dir and imdb_scraper
Then in the root dir, run "npm run website" and once it compiles syou should be able to go to http://127.0.0.1:3000 to use the website.

ToDo:
Backend:
	Allow user to manually set how many results they want (default is 100 - one page)
	Automatically scale the max results to page number, calculate how many pages there are.
	Return max number of results
	If result is unset then return the first page (start = 1)

Frontend:
	To randomize results:
		If returned result number are greater than 50 then randomize page number and requery	

For the comletely random option:
	Query the basic page (no options but adult=include set) to get *total* (8,272,043 last time I checked) movies on IMDB
	This should drastically expand the number of movies available

When user has selected more than one option, loop through the options (removing an option each time) until I get a result from the backend
