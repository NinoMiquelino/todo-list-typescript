import { CreateTaskData, Priority } from '../types';

export class Validation {
  static validateTaskData(data: CreateTaskData): string[] {
    const errors: string[] = [];

    if (!data.title || data.title.trim().length === 0) {
      errors.push('Título é obrigatório');
    }

    if (data.title && data.title.length > 100) {
      errors.push('Título não pode ter mais de 100 caracteres');
    }

    if (data.description && data.description.length > 500) {
      errors.push('Descrição não pode ter mais de 500 caracteres');
    }

    if (data.priority && !Object.values(Priority).includes(data.priority)) {
      errors.push('Prioridade inválida');
    }

    if (data.dueDate && data.dueDate < new Date()) {
      errors.push('Data de vencimento não pode ser no passado');
    }

    return errors;
  }
}