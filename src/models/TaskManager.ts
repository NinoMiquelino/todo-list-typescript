import { Task, CreateTaskData, UpdateTaskData, TaskFilters, Status, Priority } from '../types';

export class TaskManager {
  private tasks: Map<string, Task>;
  private nextId: number;

  constructor() {
    this.tasks = new Map();
    this.nextId = 1;
  }

  private generateId(): string {
    return `task-${this.nextId++}`;
  }

  createTask(data: CreateTaskData): Task {
    const now = new Date();
    const task: Task = {
      id: this.generateId(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: Status.PENDING,
      dueDate: data.dueDate,
      createdAt: now,
      updatedAt: now
    };

    this.tasks.set(task.id, task);
    return task;
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  getAllTasks(filters?: TaskFilters): Task[] {
    let tasks = Array.from(this.tasks.values());

    if (filters?.status) {
      tasks = tasks.filter(task => task.status === filters.status);
    }

    if (filters?.priority) {
      tasks = tasks.filter(task => task.priority === filters.priority);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      tasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    return tasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  updateTask(id: string, data: UpdateTaskData): Task | undefined {
    const task = this.tasks.get(id);
    if (!task) return undefined;

    const updatedTask: Task = {
      ...task,
      ...data,
      updatedAt: new Date()
    };

    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  deleteTask(id: string): boolean {
    return this.tasks.delete(id);
  }

  getTasksByStatus(status: Status): Task[] {
    return this.getAllTasks().filter(task => task.status === status);
  }

  getTasksByPriority(priority: Priority): Task[] {
    return this.getAllTasks().filter(task => task.priority === priority);
  }

  getStatistics() {
    const tasks = this.getAllTasks();
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === Status.PENDING).length,
      inProgress: tasks.filter(t => t.status === Status.IN_PROGRESS).length,
      completed: tasks.filter(t => t.status === Status.COMPLETED).length,
      highPriority: tasks.filter(t => t.priority === Priority.HIGH).length
    };
  }
}