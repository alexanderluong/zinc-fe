# Vancity Tech (Zinc) Blog Aggregator

Deployed link: http://zinc.argv.io

### Installation instructions

1. Git clone the repository from the link above using `git clone <zinc-fe link>` or `git clone <zinc-admin link>`.
2. Install the required node modules using `npm install`
3. Configure the environment, either in the `.env.development` or `.env.production` files (depending on development versus production).
   a. Change the `REACT_APP_BASE_API` to point to the local instance of the backend if you wish to use a locally deployed backend, or the deployed API URL.
   b. Change the `REACT_APP_ADMIN_EMAIL` to an email address of an admin that you wish to be listed as contact for the website.
   c. Ensure that `REACT_APP_ADMIN_DASHBOARD_LINK` is the correct link to the admin dashboard.
4. Start the frontend with `npm start`
5. The frontend should be running at the localhost port specified in the .env file. For example, `localhost:3002`.
