# Portfolio Aurora

This is a Next.js personal portfolio template for a Machine Learning Engineer, built with modern web technologies and a focus on performance, accessibility, and a stunning user experience.

## Features

- **Next.js 14+ with App Router**: Leverages the latest Next.js features for optimal performance and developer experience.
- **TypeScript & Tailwind CSS**: For a robust, type-safe, and beautifully styled application.
- **Sanity.io CMS Integration**: Projects are managed externally in Sanity, allowing for easy content updates without code changes.
- **Advanced Animations & Micro-interactions**:
  - Interactive "Aurora" background effect.
  - Custom "Spotlight" cursor.
  - "Squishy" button animations.
  - Elegant skeleton loading with shimmer effects.
  - Scroll-reveal animations for a dynamic feel.
- **Performance Optimized**: Achieves high Lighthouse scores through `next/image` optimization, lazy loading, and variable fonts.
- **Fully Accessible (a11y)**: Built with semantic HTML, keyboard navigation, and ARIA best practices.
- **AI-Powered Summaries**: Uses GenAI to generate summaries of project READMEs on the fly.

## Getting Started

### 1. Prerequisites

- Node.js (v18.x or later)
- npm, yarn, or pnpm
- A Sanity.io account and project

### 2. Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### 3. Sanity.io Setup

This project fetches project data from Sanity.io.

1.  **Set up your Sanity Studio:**
    - If you don't have one, create a new Sanity project: `npx sanity@latest init`.
    - Copy the schema files from `/sanity/schemas/` in this repository to the `schemas` folder in your Sanity Studio project.
    - Add the new schemas to your `sanity.config.ts` (or `.js`).
    - Deploy your studio: `npx sanity@latest deploy`.

2.  **Add content:**
    - Open your deployed Sanity Studio and create a few entries for your projects. Fill in all the fields.

### 4. Environment Variables

Create a `.env.local` file in the root of the project by copying the `.env.example` file (if it exists) or creating a new one.

Now, fill in the values in `.env.local`:

- `SANITY_PROJECT_ID`: Find this in your Sanity project settings.
- `SANITY_DATASET`: Usually `production`.
- `SANITY_API_VERSION`: You can keep the default, e.g., `2024-05-01`.
- `SANITY_SECRET_TOKEN`: Create a read-only API token from your Sanity project dashboard (`API` > `Tokens`).

### 5. Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified) with your browser to see the result.

### 6. Building for Production

To create a production-ready build, run:

```bash
npm run build
```

This will create an optimized build in the `.next` directory. You can then start the production server with `npm run start`.
