# Task Management App - Frontend

A modern task management application built with Next.js and TypeScript. This application allows users to manage tasks with features like drag-and-drop reordering, task completion status, and real-time updates.

## Features

- ✨ Modern, clean UI with responsive design
- 🎯 Add, delete, and update tasks
- ✅ Mark tasks as complete/incomplete
- 🔄 Drag and drop tasks to reorder
- 📱 Responsive layout for all devices
- 🌓 Clean and accessible UI components

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Hooks
- **Drag & Drop:** @dnd-kit/core
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Icons:** Lucide React

## Prerequisites

Before you begin, ensure you have installed:
- Node.js 18.0 or later
- npm or yarn
- Git

## Installation

1. Clone the repository
```bash
git clone https://github.com/ykkhmrdn/task-management-frontend.git
cd task-management
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
task-management/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   └── tasks/       # Task-specific components
│   ├── lib/
│   │   └── api.ts       # API client setup
│   ├── types/
│   │   └── task.ts      # TypeScript interfaces
│   └── hooks/           # Custom React hooks
├── public/
└── tailwind.config.js
```

## API Integration

The frontend communicates with a REST API with the following endpoints:

- `GET /tasks` - Fetch all tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
- `PUT /tasks/reorder` - Reorder tasks

## Development

To start developing:

1. Make sure the backend server is running (default: `http://localhost:5001`)
2. Start the development server:
```bash
npm run dev
```
3. Open `http://localhost:3000` in your browser

## Production Build

To create a production build:

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [dnd kit](https://dndkit.com)

## Contact

zyxkoo - ykkhmrdn@gmail.com
Project Link: [https://github.com/ykkhmrdn/task-management-frontend.git]

---
