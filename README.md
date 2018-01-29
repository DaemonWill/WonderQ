# Wonder Q
==================================================================

### Author : Daimen Q. Williams
###### [DaimenWill@gmail.com](mailto:DaimenWill@gmail.com)

---
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

# Overview:
  * Objectives
  * Technologies Used
  * Environment Setup
  * API Endpoints
  * Improvents for the API
  * Testing

------

# Objectives
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
##### Design a simple queuing system

##### WonderQ is a broker that allows multiple producers to write to it, and multiple consumers to read from it. It runs on a single server. Whenever a producer writes to WonderQ, a message ID is generated and returned as confirmation. Whenever a consumer polls WonderQ for new messages, it gets those messages which are NOT processed by any other consumer that may be concurrently accessing WonderQ.

##### NOTE that, when a consumer gets a set of messages, it must notify WonderQ that it has processed each message (individually). This deletes that message from the WonderQ database. If a message is received by a consumer, but NOT marked as processed within a configurable amount of time, the message then becomes available to any consumer requesting again.

  Tasks:

• Design a module that represents WonderQ. You can abstract the logic around database storage.
• Setup a test app that will generate messages and demonstrate how WonderQ works.
• Setup a quick and dirty developer tool that can be used to show the current state of WonderQ at any time.
• Write documentation for potential API endpoints. Talk about their inputs/ outputs, formats, methods, responses, etc.

-------


# Technologies Used

#### A standard MEAN Stack was used to create this version of WonderQ. Node.js/Express.js were givens provided their easy and lightweight setup, as well as extensible developer tools created by the huge js community. Setting up the management endpoints with server health and usage metrics was quick due to the accessible modules out there provided by this incredible community.

#### If setting up an info-graphical/aesthetically pleasing UI was a requirement, I would have (and I have already started by the time of drafting this document) used AngularJs over much less massive options like jQuery mostly due to Angular's architecture being built with jqLite (which is a lighter version of jQuery), and partly due to how much more readable and structured Angular logic is over jQuery and React.

Other technologies needed for the app setup:
  1. Node v6.10.3
  2. NPM v3.10.10
  3. MongoDB v3.6.2 (you can get the [community edition here](https://www.mongodb.com/download-center?_ga=2.206041814.493227014.1517158268-1243023413.1516770495#community) )
  4. Plugins for the above integration (check _package.json_, setup explained below)

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-------

# Environment Setup

Once Node and NPM are in place -

  1. In the project's root folder, call an _"npm install"_ to have a node_modules folder generated with most of the required dependencies for the above technologies.
  2. Start your mongoDB server (mongod.exe) and in the mongo shell run `use my-db`, where "my-db" is a place holder for whatever you wish to name your database.
  3. A configuration file is available in this project at *root/server/config*.  You can customize the database/pathing information if you wish here (use dev-config).
  4. Once the above is completed, you can start your server by calling `node server\index.js` from a command terminal at the project level.

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-------

# API Endpoints
Note, there are to be two databases in use for this application : alive/dead. The alive database denotes the messages still in circulation among the users and the dead database stores the messages that have failed many times while being processed (for troubleshooting). As of right now, only the alive database is in place; however, these endpoints would logically be similar for the dead database as well.

> (GET) ../WonderQ/status

	 - Server metrics and usage. Provides detailed time-based metrics concerning: server memory usage, local CPU usage, # of requests/responses made since uptime, and resource loading times.

> (GET) ../WonderQ/health

	 - Server up check, provides a json containing the uptime of the server

> (GET) ../WonderQ/explore
> (GET) ../WonderQ/ * /explore

	 - Provides a detailed list containing all of the information for that specfic path's route including the http methods and other endpoints being handled.

> (GET) ../WonderQ/ui

	 - Management Ui to tie in the above metrics and allow the user to do CRUD transactions with the database as if they were a consumer/producer for the queue. Adding, and deleting (as well as partially updating) are covered by the UI so far, but there is still much to be done on that part. You'll be able to test out basic api calls however.

> (GET) ../WonderQ/alive

	 - Returns a list of all the messages (up to a configurable amount, check dev-config.getMessagesLimit) that are not currently inProcess from the alive database. Upon retrieval of the list, a timeout function is called with the configured processTimeLimit; if those Messages aren't processed in that time they are set to inProcess = false and are available again for viewing.

> (POST) ../WonderQ/alive

    body required - {"question" : String}

	 - Creates a new Message in the alive database. All other defaults are set unless otherwise specified. Returns back the generated information of the message created including its _id value.

> (DELETE) ../WonderQ/alive

    body required - {"_id" : String}

	 - Removes the given Message from the alive database based on its _id value.

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-------

# Improvements for the API
Some endpoints like: `POST ../WonderQ/alive` require necessary query parameters that are being injected from the request.body at the moment. It would make sense to further develop an endpoint call like: `POST ../WonderQ/alive/:question` as another option. This would apply for all API calls with required params.

 ^^^^^^^^^

-------

# Testing
Note you can play around/conduct some ajax calls to the queue through the `../WonderQ/ui` endpoint; similar testing is found in the test directory.

From the project root folder, run:

    npm test

: to view test results for API calls to the alive db endpoints.
