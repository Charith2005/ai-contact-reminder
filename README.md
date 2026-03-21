AI Contact Reminder
Overview

AI Contact Reminder is a lightweight relationship management tool that helps users maintain strong professional connections. The system analyzes contact information and recommends who the user should reach out to based on time since last interaction and relationship importance.

The application also includes an AI-inspired message generator that creates personalized outreach messages using contextual information such as relationship type and previous conversations.

This project demonstrates full-stack engineering skills including API design, frontend development, data handling, and deployment.

Live Demo

Frontend
https://ai-contact-reminder-1.onrender.com

Backend API
https://ai-contact-reminder-backend.onrender.com

How to Run the Project Locally
Prerequisites

Make sure the following are installed:

Node.js (v18 or higher recommended)
npm
Git

Check versions:

node -v
npm -v

1. Clone the repository

git clone https://github.com/Charith2005/ai-contact-reminder.git

cd ai-contact-reminder

2. Run Backend

cd backend
npm install
npm run dev

Backend will run at:

http://localhost:4000

Test backend:

http://localhost:4000/contacts

3. Run Frontend

Open a new terminal:

cd frontend
npm install
npm run dev

Frontend will run at:

http://localhost:5173

README.md

Key Features
Contact Storage

Contacts are stored in a JSON file and loaded through the backend API.

Each contact contains:

name
email
company
lastContactedDate
notes

Users can:

add contacts
update contacts
delete contacts
search contacts

Recommendation Engine

The recommendation system suggests contacts to reach out to using the following logic:

A contact is recommended if:

the contact has not been contacted in 30 or more days

OR

the contact has an important relationship keyword in notes:

mentor
investor
advisor
friend

Priority order:

investor
mentor
advisor
friend
other

Contacts with stronger relationship importance appear first.

AI Message Generator

The AI message generator creates personalized follow-up messages using:

contact name
relationship type
previous conversation context
company information

Instead of using a paid AI API, the system simulates AI behavior using structured templates and dynamic phrasing.

The generator:

adapts tone based on relationship type
references previous conversations
includes company context when available
produces varied phrasing for more natural output

Example output:

Hey Sarah — I hope things are going well at Stripe. It has been a little while since we last spoke, and I was thinking about our conversation about fundraising strategy. I have always appreciated your guidance and perspective. I would love to catch up and hear any thoughts you might have.

Key Design Decisions
Full Stack Separation

The project uses a clear separation between frontend and backend.

Frontend
React application responsible for UI and user interaction.

Backend
Express server responsible for business logic and data handling.

This separation improves maintainability and scalability.

Lightweight Data Storage

Contacts are stored in a JSON file to keep the project simple and easy to run locally without requiring database setup.

For a production system, this would be replaced with a relational or document database.

Modular Backend Logic

Backend logic is separated into service modules.

recommendationService.js
Handles contact prioritization logic.

messageService.js
Handles message generation logic.

This modular approach improves readability and makes the code easier to maintain.

Simple and Clean UI

The UI is intentionally minimal to focus on functionality.

Design priorities:

readability
usability
simplicity
fast interaction

The layout uses a three-panel structure:

All contacts
Recommended contacts
Contact details and message generation

Error Handling

The system includes validation for:

missing fields
invalid dates
empty dataset scenarios
network request failures

Error messages are displayed clearly in the UI.

Assumptions Made

Contacts dataset is relatively small and can be stored in memory.

Relationship importance can be inferred from keywords in the notes field.

Users primarily want lightweight relationship reminders rather than full CRM functionality.

Message personalization does not require a paid AI API for this prototype.

Users prefer simple interaction rather than complex configuration.

What I Would Improve With More Time
Database Integration

Replace JSON storage with a database such as:

PostgreSQL
MongoDB

Benefits:

persistent storage
improved scalability
better query performance

Real AI Integration

Integrate an LLM API to generate more natural and context-aware messages.

Possible providers include OpenAI API or open-source models.

This would allow deeper personalization and more variation in tone.

User Authentication

Add user login and account-based contact storage.

Benefits:

personalized data
privacy protection
multi-user support

Advanced Recommendation Logic

Improve recommendation quality using:

interaction frequency modeling
relationship strength scoring
calendar integration
email interaction signals

Improved UI and UX

Enhancements could include:

improved typography and spacing
dark mode
sorting and filtering options
contact tagging
reminder scheduling interface

Testing

Add unit and integration tests for:

recommendation logic
API endpoints
frontend components

Technologies Used

Frontend:

React
Vite
CSS

Backend:

Node.js
Express
CORS

Deployment:

Render
GitHub


Conclusion

This project demonstrates the ability to design and implement a practical full-stack feature with clear structure, maintainable code, and useful functionality.

The system balances simplicity and functionality while providing a strong foundation for future improvements.

