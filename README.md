# JobFinder

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Project Context

JobFinder is a job search application that allows job seekers to browse job offers from multiple international sources via public APIs. It is developed as a Single Page Application (SPA) using Angular for the frontend only. A custom backend is not developed; instead, JSON Server is used to simulate a REST API and persist data (users, favorites, applications).

The application allows users to:
*   Search for job offers via public APIs
*   Save their favorite offers
*   Track the status of their applications
*   Manage their personal profile

## Features

### 1. Registration and Login
Users can create an account with Name, First Name, Email, and Password. Authentication is basic (email/password) and user accounts are stored in JSON Server (`db.json` table "users"). Upon successful login, the user object (without password) is stored in `sessionStorage` or `localStorage` to manage login state and secure protected routes via `authGuard`.

### 2. Job Search
Job seekers (even unauthenticated) can search for job offers using the following mandatory criteria:
*   **Keywords (job title):** Text input in a search bar.
*   **Location (city, country, region):** Dropdown list or text input.
Results must be sorted by publication date (newest first). A loading indicator should be displayed during the search.
Displayed results are paginated (10 per page by default) and include: Job Title, Company Name, Location, Publication Date, Short Description, Link to full offer, Salary (if available), "View Offer" button, "Add to Favorites" button (authenticated users only), and "Track Application" button (authenticated users only).

### 3. Favorites Management (NgRx)
Accessible only to authenticated users.
*   Add an offer to favorites from the job list.
*   View favorite offers on a dedicated page.
*   Remove an offer from favorites.
*   Users cannot add the same offer twice.
*   A visual indicator shows if an offer is already in favorites.
Favorites are managed via JSON Server in the `favoritesOffers` table, associated with a `userId`. This feature *must* be managed with NgRx.

### 4. Application Tracking
Accessible only to authenticated users.
*   Add an offer to application tracking from the job list.
*   View all tracked applications.
*   Add personal notes for each application (optional).
*   Remove an application from the tracking list.
Application statuses: "Pending" (default), "Accepted", "Rejected". Applications are stored in JSON Server in the `applications` table, associated with a `userId`, and include offer details, status, and notes.

### 5. API Choices
At least one public API from [https://job-finder-api-nine.vercel.app/](https://job-finder-api-nine.vercel.app/) must be used. Multiple APIs can be used for aggregating results.

## Technical Concepts

*   **Angular 17+** (module or standalone)
*   **NgRx** for state management (minimum for favorites)
*   **RxJS/Observables**
*   **Dependency Injection**
*   **Reactive Forms or Template Driven Forms**
*   **Bootstrap or Tailwind CSS**
*   **Guards, Resolvers**
*   **Databinding**
*   **Services, Pipes, Parent/Child components, Routing**
*   **Lazy Loading:** At least one route.
*   **Component Composition:** Each page must have at least 2 components.
*   **Authentication:** User profile (without password) stored in `sessionStorage` or `localStorage` for login state and `authGuard`.
*   **Data Persistence (JSON Server):** `db.json` stores user favorites and applications with statuses and notes.
*   **HTTP Client** for RESTful API consumption.
*   **HTTP Error Handling** and optional **HTTP Interceptors**.
*   **Responsive Design** and **Business Validations** with error messages.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### JSON Server Setup

To simulate the backend API and persist data, you need to run JSON Server. Ensure `db.json` is in the project root.

First, install JSON Server globally (if not already installed):
```bash
npm install -g json-server
```

Then, start the JSON Server:
```bash
json-server --watch db.json --port 3000
```
This will run JSON Server on `http://localhost:3000`.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.