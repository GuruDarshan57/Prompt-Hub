# PromptHub

PromptHub is an open-source AI prompting full-stack tool for the modern world. It allows users to discover, create, discuss, and share creative prompts to inspire their writing, brainstorming sessions, and creative projects. This README file will guide you through the features, setup, and deployment process for the PromptHub app.

## ScreenShots
![1](https://github.com/user-attachments/assets/9cca903a-cc5f-4b7c-8f98-595a5a8c4445)

![2](https://github.com/user-attachments/assets/cff9fd0f-4628-41c3-b77e-e1d9e881b400)

![3](https://github.com/user-attachments/assets/a6758140-c4cf-4b59-aa46-61f4d1b7e8a6)

![4](https://github.com/user-attachments/assets/09a459e0-a27f-4f7b-a2b9-2b59e2561241)

![5](https://github.com/user-attachments/assets/5f567a2a-a8ed-4d32-9797-ab42b2ed6911)

![Prompt Hub](https://github.com/user-attachments/assets/fccd4868-995d-470a-a738-df7122297d8d)

## Features

- **Authentication with Google:** Users can sign in to PromptHub using their Google accounts, ensuring a secure and hassle-free login process.
- **Create, Edit, and Delete Posts:** Once logged in, users can create new prompts, edit existing ones, or delete prompts they no longer wish to keep. This gives them complete control over their prompt collection.
- **User Profiles:** Each user has their own profile page where they can showcase their created prompts. Other users can visit these profile pages to view and gain inspiration from the prompts shared by that user.
- **Search Functionality:** The main page of PromptHub allows users to search for prompts using keywords, tags, or usernames. This feature makes it easier for users to discover prompts related to specific themes or topics.
- **Like, Save, and Comment:** Users can like and save prompts they like, as well as comment on them.
- **Copy Prompt Text:** A handy button allows users to copy the text of a prompt with a single click. This makes it convenient to paste the prompt into an AI tool or any other writing platform.

## Prerequisites

Before running the application, you need to have the following installed on your system:

- Next.js (version 14)
- React
- Node.js (version 14 or later)
- MongoDB (version 4.0 or later)

PromptHub is deployed on Vercel, a cloud platform for static sites and serverless functions.

## Installation

1. Clone the repository to your local machine using the following command:
    ```bash
    git clone https://github.com/GuruDarshan57/Prompt-Hub/
    ```

2. Install the necessary dependencies by navigating to the project directory and running:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory of the project and add the following environment variables:
    ```
    GOOGLE_ID=
    GOOGLE_CLIENT_SECRET=
    MONGODB_URI=
    NEXTAUTH_URL=
    NEXTAUTH_URL_INTERNAL=
    NEXTAUTH_SECRET=
    ```

4. Run the app:
    ```bash
    npm run dev
    ```

## API Endpoints

The following API endpoints are available:

- **POST /api/prompt/create:** Create a new prompt.
- **GET /api/prompt:** Get all prompts.
- **GET /api/prompt/{promptId}:** Get prompt.
- **PATCH /api/prompt/{promptId}:** Update prompt.
- **DELETE /api/prompt/{promptId}:** Delete prompt.
- **GET /api/user/{userId}/posts:** Get prompts by a user.
- **POST /api/comment/{promptId}:** Add comment on prompt.
- **POST /api/like/{promptId}:** Add like to prompt.
- **POST /api/save/{promptId}:** Save prompt.

## Error Handling

The API endpoints return error responses with code and message.

## Tribute

A special thanks to [JavaScript Mastery](https://www.youtube.com/@JavaScriptMastery) for their exceptional Next.js tutorial. Their guidance and resources were invaluable in bringing this project to life.

