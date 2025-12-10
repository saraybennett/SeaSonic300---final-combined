This is a collaboration between Sara & Katie for their IMA Low Res Fall 2025 Connections Lab course. It is an extension of the project that they did for their project 02.

SB notes 12.6:

- worked on getting web sockets working, talked with Brian and he said that we need to manually assign users a unique id since that is not being done for us like it was using socket.io, line 58 in index.js is where I tried to work on this but did not succeed
- added button to work on story hover but we can also use button clicks if they are put in the right part of the code which seems to be in the dom content loaded function

SB notes 12.7:

- removed wait for dom element to load stuff because I wasn't sure how to make it work with sending/receiving socket info, can work on adding back in once we solve socket issues
- cursor data being sent to the server and then broadcast to the client, now the only issue is that the cursor is not being drawn on the screen, lines 287-292 in app.js, reached out to brian for:

  // Only draw cursor if position and cursor image data exists - THIS IS NOT WORKING RN, NEED TO TROUBLESHOOT

  if (data.x !== undefined && data.y !== undefined && data.cursor) {
  var el = getCursorElement(data.id, data.cursor);
  el.style.left = data.x + "px";
  el.style.top = data.y + "px";
  console.log("Drew cursor for:", data.id, "at", data.x, data.y);
  }

-once the cursor is being drawn correctly, then will need to work on getting the sound to play for everyone via sockets
-cursor element drawing but when you first click, there is a static image of the cursor, not sure why this is happening

SB Notes 12.8:

- worked with Adam to get cursorimages handled on the server side so then can tie individual mouseclicks to specific cursor images
- worked on adding click - > light functionality for angler
  Received: { type: 'userClick', name: 'angler' }
  angler was clicked
  - will continue working, pushing at 6pm just to make sure we have code that is mostly working
  - got this working! seems a little glitchy but is working so yay! (will ask Adam tomorrow to see if we can troubleshoot)
  - got sound stuff working with Shimmy & rev so thank you!!

to do NOW:

1. figure out what to do when all cursor elements have been assigned, what to do when the serverCursorIndex is null, have a pop up of some kind letting the user know? let them explore the narrative elements of this? - handle it on the client side somehow - FIGURE THIS OUT (164 app.js) 3. continue to work on the narrative & critical experience part of the site --

///
to do LATER:

- clean up code like removing console.log statements that are no longer necessary & old code we don't need

SB Notes 12.9:

- worked on getting welcome message pop ups & incorporated styling sent by katie

//

to do NOW:

- work on story.html page & just get the creature & text there for now (hopefully integrate fully into main site when we have time) (mostly done for now)

///
to do LATER:

- clean up code like removing console.log statements that are no longer necessary & old code we don't need
- figure out what to do when all cursor elements have been assigned, what to do when the serverCursorIndex is null, have a pop up of some kind letting the user know? let them explore the narrative elements of this? - handle it on the client side somehow - FIGURE THIS OUT (164 app.js)
- seems like for the angler, if the angler cursor is assigned to a user & then they leave, when the new angler is reassigned, the on/off functionatlity stops working (minor since we'll just have the angler loaded for ourselves but would be nice to troubleshoot)
- work on mobile functionality of both the main site & the story site (add the @media or whatever it is to place elements/buttons & also to resize text)

update to code - fresh push
