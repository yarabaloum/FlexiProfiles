# FlexiProfiles — AI-Assisted Profile Management System

FlexiProfiles is an AI-assisted profile management system designed and implemented as an end-to-end full-stack application.  
The system integrates a Spring Boot (Java) backend with RESTful APIs, PostgreSQL for persistent data storage, and OpenAI GPT-3.5 for AI-generated profile content.  
The frontend is implemented using HTML, CSS, and JavaScript, enabling dynamic user interaction and profile management.

---

## System Capabilities
- AI-assisted generation of professional profile content using OpenAI GPT-3.5
- Full CRUD (Create, Read, Update, Delete) functionality
- RESTful communication between frontend and backend
- Persistent data storage using PostgreSQL
- Clean separation of application layers following MVC principles
- Input validation using DTOs and Bean Validation

---

## Architecture and Implementation
The backend is built using Spring Boot (Java) and follows a clean layered architecture with clear separation between controllers, services, and repositories.
The codebase is organized using an entity-based package structure, where each business domain contains its relevant components, ensuring maintainability and scalability.

The system uses DTOs with Bean Validation to define clear API contracts, while DTO–Entity mapping is handled explicitly within the service layer, providing full control over data transformations.

Data persistence is managed using JPA / Hibernate, with structured SQL-based storage in PostgreSQL.

The frontend is implemented using HTML, CSS, and JavaScript, providing a responsive and intuitive interface for interacting with the system.
---

## Technology Stack
**Backend:** Java, Spring Boot, RESTful APIs, OpenAI GPT-3.5  
**Database:** PostgreSQL, SQL, JPA / Hibernate  
**Frontend:** HTML, CSS, JavaScript  
**Build & Tools:** Maven, Git, GitHub

---

## System Flow
```plaintext
User Input
  ↓
Frontend (HTML / CSS / JavaScript)
  ↓  RESTful API
Backend (Spring Boot)  ↔  OpenAI GPT-3.5 API
  ↓
PostgreSQL Database
  ↓
Response to Frontend
