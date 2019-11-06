# ChatGenerator
Javascript code that will generate a chat window and enable easy implementation of chatbot on all sites

## Description
Script and css that generate chat window using vanilla Javascript and pure CSS3. Used by importing css via <link> tag and javascript using <script> tag.

## Usage
In the HTML file where the user want for the chat window to appear we need imports of the 2 files and the addition of the <div> element in the #.html file in which it is to be added.
  ### Steps
  1. Add a link tag for the CSS -> "<link rel="stylesheet" type="text/css" href="###SERVER_PATH_TO_STYLE.CSS###">" on the top (preferably header of the HTML file)
  2. Add an empty div element with a 'chat-container' ID to the same HTML file -> "/</div id="chat-container"/>/" 
  3. Add a script tag -> "<script src="###SERVER_PATH_TO_INDEX.JS###"></script>" on the bottom of the HTML file
## Possible Errors
  -> Classes and id's in the imported CSS overalapping with the existing names of the classes and id's in clients projects
  
  -> CSS loaded after JS (dynamic generation of elements will be missing any styling)
  
  -> Session storage not containing userId and/or token (cannot send a request without it)
  
  -> URL for the API is not correct
