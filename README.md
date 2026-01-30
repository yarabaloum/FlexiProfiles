# FlexiProfiles — Full-Stack AI-Driven Profile Management System

**FlexiProfiles** is a full-stack web application that automates the generation and management of professional user profiles using **AI-powered content creation** via **OpenAI GPT-3.5**. The system combines a robust **Java Spring Boot** backend with a responsive **HTML/CSS/JavaScript** frontend and stores data in a **PostgreSQL** database, supporting full **CRUD operations**.

---

## Features
- AI-generated professional profile content using **OpenAI GPT-3.5**.
- Full **CRUD operations** for profile management.
- RESTful API architecture following **MVC design principles**.
- Responsive frontend for dynamic user interaction.
- Data persistence with **PostgreSQL** and **JPA/Hibernate**.
- Build automation with **Maven** and version control via **Git/GitHub**.

---

##  Tech Stack
- **Backend:** Java, Spring Boot, REST APIs, OpenAI API, PostgreSQL, JPA/Hibernate
- **Frontend:** HTML, CSS, JavaScript
- **Tools:** Maven, Git, GitHub
- **Architecture:** MVC, CRUD Operations

---

##  Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yarabaloum/FlexiProfiles.git
2. Run the application
3. Open your browser and navigate to: 
http://localhost:9999/main

- Ensure Java, Maven, PostgreSQL, and your OpenAI API key are configured properly.

---

##  How It Works
1. Users interact with a simple, responsive web interface to input basic profile details or prompts.
2. The frontend sends a REST API request to the backend server.
3. The backend processes the request, communicates with the **OpenAI GPT-3.5 API**, and generates tailored profile content.
4. Generated profiles are stored in **PostgreSQL** via **JPA/Hibernate**.
5. The backend returns the profile data to the frontend for dynamic display, where users can view, edit, or delete profiles.

###  Workflow Diagram
```plaintext
User Input
     ↓
Frontend (HTML/CSS/JavaScript)
     ↓   REST API Call
Backend (Java Spring Boot)  ↔  OpenAI GPT-3.5 API
     ↓
PostgreSQL Database
     ↓
Dynamic Profile Display (Frontend)

