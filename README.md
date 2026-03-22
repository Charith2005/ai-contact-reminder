## AI Contact Reminder

Simple relationship management tool with intelligent follow-up recommendations and AI-generated outreach messages.

Stay connected with the people who matter most.

AI Contact Reminder helps you track professional relationships and reminds you who to reach out to based on interaction history and relationship importance.

It also includes an AI-powered message generator that creates personalized follow-up messages using contextual information such as relationship type, company, and previous conversations.

Designed as a full-stack prototype demonstrating API design, frontend development, recommendation logic, AI integration, and deployment.

---

## Live Demo

### Frontend
https://ai-contact-reminder-1.onrender.com

### Backend API
https://ai-contact-reminder-backend.onrender.com

---

## Features

### Intelligent Contact Recommendations

Automatically identifies people you should reconnect with based on:

- Time since last interaction
- Relationship importance
- Professional context

High-priority contacts such as mentors and investors appear first, ensuring that important relationships are maintained consistently.

---

### AI-Powered Message Generator

Generates personalized outreach messages using:

- contact name
- relationship type
- company context
- previous conversation notes

The backend supports real LLM-based generation through an API key and also includes a fallback generator so the project can still run without external API access.

Example output:

Hi Sarah — I hope things are going well at Stripe. It has been a little while since we last spoke, and I was thinking about our conversation about fundraising strategy. I have always appreciated your guidance as a mentor and would love to catch up when you have time.

This feature demonstrates how AI can be used to create more natural, context-aware follow-up communication instead of relying only on fixed templates.

---

### Contact Management

Users can:

- add contacts
- edit contact details
- delete contacts
- search contacts
- view contact profiles

Each contact includes:

- name
- email
- company
- last contact date
- relationship notes

---

### Smart Sorting and Filtering

Contacts are automatically sorted based on importance and recency of communication.

Priority order:

1. investor
2. mentor
3. advisor
4. friend
5. other

This ensures the most valuable relationships appear first.

---

## How to Run the Project

### Prerequisites

Install:

- Node.js
- npm
- Git

Verify installation:

node -v  
npm -v  

---

### Clone Repository

git clone https://github.com/Charith2005/ai-contact-reminder.git  

cd ai-contact-reminder  

---

### Backend Setup

Open a terminal and run:

cd backend  

npm install  

If you want to use real LLM-based message generation, install the backend dependencies and create an environment file:

npm install openai dotenv  

Create a file named `.env` inside the `backend` folder and add:

OPENAI_API_KEY=your_api_key_here

If no API key is provided, the project will still run using the fallback message generator.

Then start the backend:

npm run dev  

Backend runs at:

http://localhost:4000  

Test endpoint:

http://localhost:4000/contacts  

---

### Frontend Setup

Open a new terminal:

cd frontend  

npm install  

npm run dev  

Frontend runs at:

http://localhost:5173  

---

### Deployment Environment Variables

For backend deployment, add this environment variable on Render:

OPENAI_API_KEY=your_api_key_here

For frontend deployment, add this environment variable on Render:

VITE_API_BASE_URL=https://ai-contact-reminder-backend.onrender.com

---

## Project Structure

ai-contact-reminder

backend  
│  
├── utils  
│   ├── recommendationService.js  
│   └── messageService.js  
│  
├── contacts.json  
├── server.js  
├── package.json  
└── .env  

frontend  
│  
├── src  
│   ├── components  
│   │   ├── ContactList.jsx  
│   │   ├── ContactForm.jsx  
│   │   ├── ContactProfile.jsx  
│   │   ├── RecommendationPanel.jsx  
│   │   └── MessageGenerator.jsx  
│   │  
│   ├── App.jsx  
│   ├── main.jsx  
│   └── index.css  
│  
├── package.json  
└── .env  

README.md

---

## Key Design Decisions

### Separation of Frontend and Backend

Frontend handles:

- user interface
- interaction logic
- API communication

Backend handles:

- contact storage
- recommendation logic
- AI-powered message generation logic

This improves maintainability and scalability.

---

### Lightweight Storage Using JSON

Contacts are stored in a JSON file to simplify development and reduce setup complexity.

Advantages:

- no database configuration required
- easy debugging
- quick local setup


### Simple and Clean UI

The interface prioritizes clarity and usability.

Three-panel layout:

1. All contacts
2. Recommended contacts
3. Contact details and message generator

The design focuses on readability and fast interaction.

---

## Assumptions

- Contact dataset is relatively small
- Relationship importance can be inferred from keywords in notes
- Users want a lightweight reminder tool rather than a full CRM
- Real AI generation is optional and depends on whether an API key is available
- The fallback generator should keep the project functional even without external AI access
- Users prefer minimal configuration and fast performance

---

## Improvements With More Time

### Database Integration

Replace JSON storage with a database.

### User Authentication

Add login functionality.

### UI Enhancements

Potential improvements:

- dark mode
- contact tags
- interaction history timeline
- reminder scheduling interface
- improved layout spacing
---

## Technologies Used

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express
- CORS
- OpenAI SDK
- dotenv

### Deployment

- Render
- GitHub

---

## Conclusion

AI Contact Reminder demonstrates how full-stack systems can intelligently support professional relationship management.

The project combines recommendation logic, CRUD functionality, search, and AI-assisted communication in a lightweight and practical workflow.

It balances simplicity and functionality while providing a strong foundation for future improvements such as stronger AI integration, authentication, and advanced analytics.
