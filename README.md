# Deals App
This repository contains the Deals App, an Angular-based application for managing and displaying deals. The application is structured using the Nx workspace and is hosted on GitHub Pages. The public version of the app is available at:

Public Hosted Version: https://diegoep.github.io/deals-app

## Features
- View and manage deals with key attributes like name, description, purchase price, NOI and more.
- Responsive UI built using Angular Material components (such as tables, paginator, and sort).
- Interactive filtering and deal editing capabilities.
- GitHub Pages deployment for easy public access.

## Installation and Setup
To set up the project locally, follow these instructions:

### Prerequisites
- Node.js (v16+ recommended)

### Clone the Repository
```bash
git clone https://github.com/diegoep/deals-app.git
cd deals-app
```

### Install Dependencies
Run the following command to install the necessary dependencies:
```bash
npm install
```

## Running the Application
To run the application locally for development:
```bash
npm start
```

The app will be available at http://localhost:4200.

## Running Tests
The project includes unit tests for the application. To run the tests, use the following command:
```bash
npm run test
```
This will run all the tests and display the results in the terminal.

## Building the Application

To build the application for production, use the following command:

```bash
npm run build:prod
```
The built application will be placed in the dist/termsheet-deals-app/browser directory.

## GitHub Pages Deployment

The application is deployed to GitHub Pages using GitHub Actions. You can find the public deployment at the following URL:
Public Hosted Version: https://diegoep.github.io/deals-app

To deploy changes, simply push to the main branch. GitHub Actions will automatically trigger the deployment.


