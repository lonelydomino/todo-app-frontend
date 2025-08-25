# Todo App Frontend

Next.js frontend for the Todo List application with TypeScript and Tailwind CSS.

## Features

- **Home View**: Display all tasks with completion status, color coding, and action buttons
- **Create Task**: Form to add new tasks with title and color selection
- **Edit Task**: Modify existing task details
- **Task Management**: Toggle completion status, delete tasks with confirmation
- **Responsive Design**: Mobile-friendly interface with modern UI
- **Real-time Updates**: Immediate feedback for all user actions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)
- **Routing**: Next.js built-in routing

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see backend repository)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd todo-app-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── create/            # Create task page
│   ├── edit/[id]/         # Edit task page (dynamic route)
│   └── page.tsx           # Home page
├── components/             # Reusable UI components
│   ├── CreateTaskButton.tsx
│   └── TaskCard.tsx
├── services/               # API service functions
│   └── api.ts
└── types/                  # TypeScript type definitions
    └── task.ts
```

## Components

### TaskCard
Displays individual task information with:
- Completion toggle (checkbox)
- Task title and color badge
- Creation date
- Edit and delete action buttons

### CreateTaskButton
Navigation button to the create task form with hover effects.

### Create/Edit Forms
Unified form component for both creating and editing tasks with:
- Title input (required)
- Color selection (6 color options)
- Form validation
- Loading states
- Error handling

## API Integration

The frontend communicates with the backend through the `api.ts` service file, which provides:

- `getTasks()` - Fetch all tasks
- `createTask(data)` - Create new task
- `updateTask(id, data)` - Update existing task
- `deleteTask(id)` - Delete task
- `toggleTaskCompletion(id, completed)` - Toggle task status

## Color System

Tasks support 6 predefined colors:
- Red, Blue, Green, Yellow, Purple, Pink

Each color has consistent styling across the application with proper contrast ratios.

## Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly buttons
- Optimized spacing for different screen sizes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Development

The development server runs on port 3000 by default. Make sure your backend API is running on port 3001 (or update the `NEXT_PUBLIC_API_URL` environment variable accordingly).

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Client-side routing for fast navigation
- Optimized re-renders with React hooks
- Efficient state management
- Minimal bundle size with tree shaking
