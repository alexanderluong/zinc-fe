# Zinc Blog Aggregator (CPSC 319)

**Deployed link:** http://zinc.argv.io ✨✨✨

### About this project

This is the frontend component of our CPSC 319 team project. Our objective was to build a blog aggregator to drive visitors to the blogs and posts of various local tech companies in Vancouver. We had three components in separate repositories: main website frontend, admin dashboard frontend, and backend server.

The main frontend was built using React.js, TypeScript, and Material UI.

### Features 

![main page demo](demo-main.gif)

- Post view to show all approved posts, with company names and dates approved
- Filter by company and/or category
- Search by article title
- RSS feed and email button links

![signed in features](signedin.gif)

- Personalized front page after sign in or sign up
- Manage categories subscribed to for a weekly email digest of new approved articles
- Submit a new post to be approved


### Installation instructions

1. Git clone the repository from the link above using `git clone <zinc-fe link>` or `git clone <zinc-admin link>`.
2. Install the required node modules using `npm install`
3. Configure the environment, either in the `.env.development` or `.env.production` files (depending on development versus production).
   - Change the `REACT_APP_BASE_API` to point to the local instance of the backend if you wish to use a locally deployed backend, or the deployed API URL.
   - Change the `REACT_APP_ADMIN_EMAIL` to an email address of an admin that you wish to be listed as contact for the website.
   - Ensure that `REACT_APP_ADMIN_DASHBOARD_LINK` is the correct link to the admin dashboard.
4. Start the frontend with `npm start`
5. The frontend should be running at the localhost port specified in the .env file. For example, `localhost:3002`.