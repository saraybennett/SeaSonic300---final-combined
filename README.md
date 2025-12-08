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
