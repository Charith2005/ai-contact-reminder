## AI Contact Reminder
Simple relationship management tool with intelligent follow-up recommendations and AI-generated outreach messages.

Stay connected with the people who matter most.

AI Contact Reminder helps you track professional relationships and reminds you who to reach out to based on interaction history and relationship importance.

It also includes an AI-style message generator that creates personalized follow-up messages using contextual information such as relationship type and previous conversations.

Designed as a full-stack prototype demonstrating API design, frontend development, recommendation logic, and deployment.

Live Demo

Frontend
https://ai-contact-reminder-1.onrender.com

Backend API
https://ai-contact-reminder-backend.onrender.com

Features
Intelligent Contact Recommendations

Automatically identifies people you should reconnect with based on:

• Time since last interaction
• Relationship importance
• Professional context

High-priority contacts such as mentors and investors appear first.

This ensures you maintain strong relationships without manually tracking communication timelines.

AI-Style Message Generator

Generates personalized outreach messages using:

• contact name
• relationship type
• company context
• previous conversation notes

Example generated message:

Hi Sarah — I hope things are going well at Stripe. It has been a little while since we last spoke, and I was thinking about our conversation about fundraising strategy. I have always appreciated your guidance as a mentor and would love to catch up when you have time.

The system simulates AI generation logic without requiring a paid API.

Contact Management

Users can:

• add contacts
• edit contact details
• delete contacts
• search contacts instantly
• view contact profiles

Each contact includes:

name
email
company
last contact date
relationship notes

Smart Sorting and Filtering

Contacts are automatically sorted based on importance and recency of communication.

Example priority order:

investor
mentor
advisor
friend
other

This ensures the most valuable relationships are surfaced first.

How to Run the Project
Prerequisites

Install:

Node.js
npm
Git

Verify installation:

node -v
npm -v

1. Clone Repository

git clone https://github.com/Charith2005/ai-contact-reminder.git

cd ai-contact-reminder

2. Start Backend

cd backend

npm install

npm run dev

Backend runs at:

http://localhost:4000

Test API:

http://localhost:4000/contacts

3. Start Frontend

Open new terminal:

cd frontend

npm install

npm run dev

Frontend runs at:

http://localhost:5173

Project Structure

ai-contact-reminder

backend
│
├── utils
│ ├── recommendationService.js
│ └── messageService.js
│
├── contacts.json
├── server.js
└── package.json

frontend
│
├── src
│ ├── components
│ │ ├── ContactList.jsx
│ │ ├── ContactForm.jsx
│ │ ├── ContactProfile.jsx
│ │ ├── RecommendationPanel.jsx
│ │ └── MessageGenerator.jsx
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
└── package.json

README.md

Design Decisions
Clear Separation of Frontend and Backend

Frontend handles:

user interface
interaction logic
API requests

Backend handles:

contact storage
recommendation logic
message generation logic

This separation improves maintainability and scalability.

Lightweight Storage Using JSON

Contacts are stored in a JSON file for simplicity.

Advantages:

easy setup
no database configuration required
fast local development

Future versions could use:

PostgreSQL
MongoDB

Modular Backend Architecture

Logic is separated into services:

recommendationService.js
handles ranking and filtering contacts

messageService.js
handles message generation logic

This improves readability and makes the system easier to extend.

Simple and Clean UI

The interface focuses on usability and clarity.

Three panel layout:

All contacts
Recommended contacts
Contact details and message generation

Design emphasizes readability and fast interaction.

Assumptions

Contacts dataset is relatively small.

Relationship importance can be inferred from keywords in notes.

Users prefer a lightweight reminder system rather than a complex CRM.

AI generation can be simulated without external APIs for this prototype.

Users want minimal setup and fast performance.

Improvements With More Time
Database Integration

Replace JSON storage with a database.

Benefits:

persistent storage
scalability
faster querying

Real AI Integration

Integrate an LLM API for more advanced message personalization.

Possible improvements:

more natural tone
better contextual awareness
adaptive writing style

User Authentication

Add login functionality.

Benefits:

personalized contact lists
data privacy
multi-user support

Improved Recommendation Intelligence

Enhance recommendation quality using:

interaction frequency scoring
calendar integration
email history signals
relationship strength modeling

UI Enhancements

Potential improvements:

dark mode
contact tags
interaction history timeline
reminder scheduling interface
improved visual hierarchy

Testing

Add automated tests for:

API endpoints
recommendation logic
frontend components

Technologies Used

Frontend

React
Vite
CSS

Backend

Node.js
Express
CORS

Deployment

Render
GitHub

Conclusion

AI Contact Reminder demonstrates how full-stack systems can intelligently support professional relationship management.

The system balances simplicity and functionality while providing a strong foundation for future improvements such as AI integration, authentication, and advanced analytics.
