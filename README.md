# Final Personal Dashboard

## Project Overview
This project is a full-stack personal dashboard built using HTML, CSS, JavaScript, Node.js, and Express.js. The application allows users to view and save activities through a REST API while demonstrating Express integration and cloud deployment.

## Features
- Responsive dashboard interface
- Dark mode toggle
- View activities from an Express API
- Save new activities using a POST request
- Express middleware for JSON parsing and request logging
- Uses environment variables with `process.env`
- Deployed to Render

## Deployment Steps (Render)
1. Created a GitHub repository and uploaded the project files.
2. Logged into Render and created a new Web Service.
3. Connected the GitHub repository to Render.
4. Selected the **Node** runtime.
5. Set the Build Command to:
```text
npm install
```
6. Set the Start Command to:
```text
node server.js
```
7. Added the following environment variable:
```text
APP_MESSAGE = Welcome to Hira's Live Dashboard
```
8. Clicked **Deploy Web Service**.
9. Verified that the application deployed successfully and was accessible through the Render URL.

## Environment Variable Setup
The application uses the following environment variables:
| Variable | Purpose |
|----------|---------|
| `APP_MESSAGE` | Displays a custom welcome message returned by the API. |
| `PORT` | Specifies the port used by the server. Render provides this automatically. |
When running locally, the application uses default values if these variables are not set.

## Special Configuration
- Express serves the front-end files from the `public` directory.
- Project dependencies are installed using:
```text
npm install
```
- The application is started locally using:
```text
node server.js
```
## Live Application
https://final-dashboard-info320.onrender.com/
