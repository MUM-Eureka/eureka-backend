# Eureka Core Engine

This repository holds the core logic and processes of the Eureka Platform

## Environment Variables

To run this project, you will need to add a few environment variables to your `.env` hosted at the root directory. Please request the file from one of the existing developers

## Installation and Running Locally

Clone the project

```bash
  git clone https://github.com/MUM-Eureka/eureka-backend.git
```

Go to the project directory

```bash
  cd eureka-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Branching Convention

Eureka uses a Featuere Branch Workflow for development. Therefore, for new features or fixes, we would generally fork from the development branch and work on the new branch

- When picking up a task, we follow the naming convention as such for features - `feature/my-new-feature` and for bugs - `bugfix/i-fix-a-bug`
- Write meaningful commits so everyone can understand what you are doing
- When your task is done, test your feature extensively and try to catch any breaking cases
- If everything looks good to you, put up a Pull Request and tag another developer to review. Remember to include a summary and testing instructions !
- Once approved, we will merge in the code to the main branch and deploy to production
