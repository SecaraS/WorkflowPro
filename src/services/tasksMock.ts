export type TaskStatus = "todo" | "inprogress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assignee?: string;
};

export const tasks: Task[] = [
  {
    id: 1,
    title: "Setup project architecture",
    description: "Configure initial project structure and dependencies",
    status: "done",
    priority: "high",
    dueDate: "2026-03-25",
    assignee: "Alex",
  },
  {
    id: 2,
    title: "Create auth system",
    description: "Implement user authentication and authorization",
    status: "done",
    priority: "high",
    dueDate: "2026-03-28",
    assignee: "Jordan",
  },
  {
    id: 3,
    title: "Build dashboard UI",
    description: "Create dashboard mockup and components",
    status: "inprogress",
    priority: "high",
    dueDate: "2026-04-05",
    assignee: "Sam",
  },
  {
    id: 4,
    title: "Implement task board",
    description: "Build Kanban board with drag & drop functionality",
    status: "todo",
    priority: "high",
    dueDate: "2026-04-10",
  },
  {
    id: 5,
    title: "Add task filtering",
    description: "Filter tasks by priority and assignee",
    status: "todo",
    priority: "medium",
    dueDate: "2026-04-15",
  },
];
