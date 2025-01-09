# OLX Clone
This repository contains an OLX clone application, built with Next.js, Tailwind CSS, Express.js, MongoDB, and Mongoose ODM. The app enables users to create, edit, and delete ads after logging in. It also includes a search feature to filter ads by specific keywords or categories. Authentication is handled via JWT and cookies for enhanced security and session management.

# Features
### User Authentication:

Secure login and registration system using JWT (JSON Web Tokens) for stateless authentication.
Authentication tokens are stored in HTTP-only cookies to improve security and prevent XSS attacks.
Users can securely register, log in, and maintain their sessions.
### Create Ads:

Logged-in users can post new ads to sell products or services. Each ad includes details such as title, description, price, and category.
### Edit and Delete Ads:

Users can edit or delete ads, but only the original creator (owner) of the ad has the permissions to modify or remove it.
### Search Ads:

Users can search for ads based on keywords, and filter results based on predefined categories or tags.
### Responsive Design:

The application is built using Tailwind CSS, ensuring a responsive, modern, and mobile-friendly user interface.
### MongoDB Integration:

All user data and ad information are stored in MongoDB, with data validation and interaction handled via Mongoose for efficient query operations.
# Technologies Used
**Next.js**: A React framework that provides server-side rendering (SSR) and static site generation (SSG), enabling a fast, SEO-friendly application.
**Tailwind CSS**: A utility-first CSS framework that accelerates UI development with responsive, customizable styles.
**Express.js**: A minimal web framework used for building RESTful API routes and handling business logic.
**MongoDB**: A NoSQL database for storing data related to users and ads.
**Mongoose**: A MongoDB object modeling tool that simplifies database queries and validation.
**JWT (JSON Web Tokens)**: Used for stateless user authentication. The token is generated on login and stored in HTTP-only cookies to manage sessions securely.
