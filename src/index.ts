import { TaskManager } from './models/TaskManager';
import { DateUtils } from './utils/DateUtils';
import { Validation } from './utils/Validation';
import { CreateTaskData, Priority, Status } from './types';

class TodoApp {
  private taskManager: TaskManager;

  constructor() {
    this.taskManager = new TaskManager();
    this.initializeSampleData();
  }

  private initializeSampleData(): void {
    const sampleTasks: CreateTaskData[] = [
      {
        title: 'Estudar TypeScript',
        description: 'Completar o projeto de gerenciamento de tarefas',
        priority: Priority.HIGH,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
      },
      {
        title: 'Fazer compras',
        description: 'Comprar ingredientes para o jantar',
        priority: Priority.MEDIUM,
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 dia
      },
      {
        title: 'Academia',
        description: 'Treino de musculação',
        priority: Priority.LOW
      }
    ];

    sampleTasks.forEach(task => this.taskManager.createTask(task));
  }

  displayWelcome(): void {
    console.log('🎯 **Sistema de Gerenciamento de Tarefas**\n');
    console.log('Comandos disponíveis:');
    console.log('- list: Listar todas as tarefas');
    console.log('- add: Adicionar nova tarefa');
    console.log('- complete <id>: Marcar tarefa como concluída');
    console.log('- delete <id>: Excluir tarefa');
    console.log('- stats: Ver estatísticas');
    console.log('- exit: Sair do programa\n');
  }

  listTasks(): void {
    const tasks = this.taskManager.getAllTasks();
    
    if (tasks.length === 0) {
      console.log('📝 Nenhuma tarefa encontrada.\n');
      return;
    }

    console.log('📋 **Lista de Tarefas**\n');
    
    tasks.forEach(task => {
      const statusIcon = this.getStatusIcon(task.status);
      const priorityIcon = this.getPriorityIcon(task.priority);
      const dueInfo = task.dueDate ? 
        ` | ⏰ ${DateUtils.formatDate(task.dueDate)}` : '';
      
      console.log(`${statusIcon} ${priorityIcon} ${task.id}: ${task.title}${dueInfo}`);
      console.log(`   📄 ${task.description}`);
      console.log(`   📅 Criada: ${DateUtils.formatDateTime(task.createdAt)}`);
      
      if (task.dueDate && DateUtils.isPastDue(task.dueDate)) {
        console.log('   ⚠️  **VENCIDA**');
      }
      
      console.log('');
    });
  }

  private getStatusIcon(status: Status): string {
    switch (status) {
      case Status.PENDING: return '⏳';
      case Status.IN_PROGRESS: return '🔄';
      case Status.COMPLETED: return '✅';
      default: return '📝';
    }
  }

  private getPriorityIcon(priority: Priority): string {
    switch (priority) {
      case Priority.LOW: return '🟢';
      case Priority.MEDIUM: return '🟡';
      case Priority.HIGH: return '🔴';
      default: return '⚪';
    }
  }

  showStatistics(): void {
    const stats = this.taskManager.getStatistics();
    
    console.log('📊 **Estatísticas**\n');
    console.log(`📈 Total de tarefas: ${stats.total}`);
    console.log(`⏳ Pendentes: ${stats.pending}`);
    console.log(`🔄 Em progresso: ${stats.inProgress}`);
    console.log(`✅ Concluídas: ${stats.completed}`);
    console.log(`🔴 Alta prioridade: ${stats.highPriority}`);
    console.log('');
  }
}

// Execução do programa
const app = new TodoApp();
app.displayWelcome();
app.listTasks();
app.showStatistics();