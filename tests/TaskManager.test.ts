import { TaskManager } from '../src/models/TaskManager';
import { Priority, Status } from '../src/types';

describe('TaskManager', () => {
  let taskManager: TaskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  });

  test('should create a task', () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      priority: Priority.HIGH
    };

    const task = taskManager.createTask(taskData);

    expect(task.title).toBe(taskData.title);
    expect(task.description).toBe(taskData.description);
    expect(task.priority).toBe(Priority.HIGH);
    expect(task.status).toBe(Status.PENDING);
    expect(task.id).toMatch(/^task-\d+$/);
  });

  test('should retrieve all tasks', () => {
    taskManager.createTask({
      title: 'Task 1',
      description: 'Desc 1',
      priority: Priority.LOW
    });

    taskManager.createTask({
      title: 'Task 2',
      description: 'Desc 2',
      priority: Priority.MEDIUM
    });

    const tasks = taskManager.getAllTasks();
    expect(tasks.length).toBe(2);
  });

  test('should update task status', () => {
    const task = taskManager.createTask({
      title: 'Test Task',
      description: 'Test Description',
      priority: Priority.MEDIUM
    });

    const updated = taskManager.updateTask(task.id, { status: Status.COMPLETED });
    
    expect(updated?.status).toBe(Status.COMPLETED);
    expect(updated?.updatedAt).not.toBe(task.updatedAt);
  });
});