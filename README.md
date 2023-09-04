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

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
