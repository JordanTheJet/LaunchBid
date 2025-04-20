# Backend Server Setup Guide

This guide will walk you through setting up and running the backend server for the Launchbid application locally.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) (for cloning the repository)

## Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/launchbid.git
cd launchbid
```

### 2. Install Dependencies

Install all the required dependencies by running:

```bash
npm install
```

This will install all the packages listed in the `package.json` file, including Express, Socket.IO, and TypeScript.

### 3. Set Up Environment Variables

Create a `.env` file in the root directory of the project based on the `.env.example` file:

```bash
cp .env.example .env
```

Then, open the `.env` file and fill in the required values:

```
# Blockchain RPC Provider URL (Radius Testnet or Mainnet)
RPC_PROVIDER_URL=https://testnet-rpc.radius.systems

# Agent Wallet Address (The wallet receiving payments)
COMPANY_WALLET=0x0000000000000000000000000000000000000000

# Port for the server to run on (optional, defaults to 3000)
PORT=3000
```

### 4. Run the Development Server

To start the development server with hot-reloading:

```bash
npm run dev
```

This command uses `ts-node` to run the TypeScript code directly without having to compile it first.

The server will start and you should see a message like:

```
Server running on http://localhost:3000
```

### 5. Building for Production (Optional)

If you want to build the application for production:

```bash
npm run build
```

This will:
1. Compile TypeScript files to JavaScript using the TypeScript compiler
2. Copy the `public` directory to the `dist` folder

### 6. Running the Production Build (Optional)

To run the production build:

```bash
npm start
```

This will run the compiled JavaScript code from the `dist` directory.

## Server Features

The backend server provides the following features:

- RESTful API endpoints for auction interactions
- Real-time bidding updates using Socket.IO
- Auction timer management
- Static file serving for the frontend

## Troubleshooting

### Port Already in Use

If you see an error like `Error: listen EADDRINUSE: address already in use :::3000`, it means port 3000 is already being used by another application. You can:

1. Stop the other application, or
2. Change the port in the `.env` file:
   ```
   PORT=3001
   ```

### TypeScript Errors

If you encounter TypeScript errors, make sure you have the correct versions of all dependencies installed. You can try:

```bash
npm install --force
```

### Missing Public Directory

If you get errors about missing files in the `public` directory, make sure you have created this directory and added the necessary frontend files.
