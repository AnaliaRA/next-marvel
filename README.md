# Marvel Characters App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Technical Stack
### Languages
- TypeScript
- CSS
- JavaScript
### Dependencies
The project relies on the following dependencies:
- @tanstack/react-query-persist-client
- idb
- next
- react
- react-dom
- zustand

## Getting Started
### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v20.x or later)
- npm (v10.x or later) or yarn (v1.x or later) or pnpm (v6.x or later) or bun (v0.x or later)

### Installation
1. **Clone the repository:**

   ```bashgit 
   git clone https@github.com:AnaliaRA/next-marvel.git
   cd next-marvel

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn
    # or
    pnpm
    # or
    bun
    ```
   
3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add the following environment variables:

   ```bash
    NEXT_PUBLIC_API_PUBLIC_KEY=your_public_key
    NEXT_PUBLIC_API_PRIVATE_KEY=your_private_key
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```
   Replace `NEXT_PUBLIC_API_PUBLIC_KEY` and `NEXT_PUBLIC_API_PRIVATE_KEY` with your Marvel API keys.


4. **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```
   
5. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

