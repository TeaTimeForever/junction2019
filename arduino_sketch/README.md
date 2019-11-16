## Uploading the battery image to the board SPIFF

Should be possible via this: https://arduino-esp8266.readthedocs.io/en/latest/filesystem.html#uploading-files-to-file-system

### Intended flow with buttons and timeouts
* Booting up - render the latest challenge, Go to sleep until:
  - Either "completed challenge" button is pushed
  - The timeout is reached (given in seconds in the "Sleep" header)
* When timeout is reached:
  - fetch the next image from server and render it
  - Turn off LED if user had pushed "Accept challenge"
* When "accept task" button is pushed
  - send a request to server to to signify that user has pushed task accepted
  - turn on an LED light so that it serves as checkmark - "You promised to do the task that's currently displayed"
* When "task done" (we could use the same button as "accept task" for this) is pushed, load an image "task_done" from SPIFFS, and render that until the timeout for next task is reached - see "When timeout is reached".
* Reject - for now nothing, but following options considerable
  - Send a request to server to update the status of the task.
  - Load a new image (with a limit of 2 such reloads per day)
