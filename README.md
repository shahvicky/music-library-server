## Music Library Backend Server
The application layer for the music library service
The corresponding Client side is: https://github.com/shahvicky/music-library-client

The project is completed using Node.js so you might need to install some packages.
Please use node version 8.x or 10.x

### Getting started
Clone the project
```
git clone https://github.com/shahvicky/music-library-server.git
```
Install yarn
```
npm install -g yarn
```
Install dependencies
```
cd music-library-server
yarn
```
Set environment (vars):
```
cp .env.example .env	(linux)
copy .env.example .env	(windows)
```
Change the port in .env file if you want to. Add other properties.

Start server:
```
yarn start
```
To generate api docs, I have used apidoc:

Install apidoc:
```
npm install -g apidoc
```
Generate docs:
```
yarn apidoc
```
(The docs are created in the root folder. Just open the index.html file inside the docs folder to see the api documentation)

Information on some files in the project:
```
config
	|_ config.js - configuration file to load all the environmental variables from .env. 
                  Parameters are also validated here using Object Scheme Validation(joi)
	|_ express.js - The main app setup
	|_ param_validation.js - All the parameters in the APIs are validated here using Object Scheme Validation(joi)
	|_ winston.js - The project uses winston to log the api or errors in a separate log folder. 
                  Currently, everything is logged in a file in json format. A new file is generated per day. 
                  If you want to change to logging to console, change the transport from winston.transports.File or winston.transports.DailyRotateFile to winston.transports.console
server
	|_controllers - folder to keep all the controllers
	|_routes - folder to keep all the routes
		|_index.route.js - The entry position for the routes.
		|_search.route.js - The required API is in the search route
	|_services - folder to keep services files if any
	|_helpers - folder to keep helper files
	|_tests - folder to keep the files for unit testing
.env.example - The secret keys and environment variables are present here like the database passwords or the port to run the server
index.js - The main entry point for the project. The server is started in this file
package.json - Contains the scripts and dependencies for the project
```
#### API information:
All the APIs are mounted on the /api
The following APIs are there:
1. GET api/health-check - server monitor
2. POST api/auth/register - User Registration
3. POST api/auth/login - User login
4. GET /api/addmusic/search - Search for music
5. GET /api/addmusic/addToLib - add track to user library
6. GET /api/dashboard/tracks - Get all tracks for a user
More information on the APIs are present in the docs/index.html

