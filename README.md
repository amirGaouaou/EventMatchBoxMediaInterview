# EventMatchBoxMediaInterview

**Project Overview**
You are to create a small application using Next.js with Typescript,
implementing the following user flow: Login -> Dashboard.

**Project Requirements**

1. **Login:** Implement user login using AWS Cognito. Ensure proper
error handling and logging of each type of error to local storage for
debugging purposes. Display the errors on the screen if a flag is set
to do so. Upon successful login, redirect the user to the dashboard.

2. **Dashboard/User Roles:** The dashboard should display a list of
Tiles, each representing a list of 'Events'. The visibility of events
should be managed based on the user's role:
   - Guest/Demo users should be able to see and edit only the events
marked as public.
   - Admin users should be able to see all events and edit event information.

**Tile actions**
   - Clicking on a tile should display the details of the entry.
   - Upon clicking an edit button on a tile, a modal window with a
wizard-style interface should appear for editing Event's information.
To update attendants' information, the user should be able to upload a
CSV file with three columns: name, email, and birthday.

**Event Description:**
Each 'Event' is composed of a name, event banner (that is displayed in
the tile as well), visibility and a list of attendants.

Please publish your project to a public repository on your GitHub
account once you have completed it. We request you to submit the
project by the weekened or end of the weekend.

Assets, colors and font that should be use:
https://drive.google.com/drive/folders/1oaeSuUUUkI8fHr_IgBdmb5tXeR1iClLR?usp=sharing

Cheers!
