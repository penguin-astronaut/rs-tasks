import { ITask, IUser } from './types';
import { dateInInterval, formatDate } from './datesHelper';

export class TasksTable {
  constructor() {
    const wrapper = document.querySelector('.wrapper') as HTMLDivElement;

    wrapper.innerHTML = `
      <div class="tasks-table">
        <div class="tasks-table__header">
          <button class="tasks-table__button tasks-table__button--prev">
            Prev
          </button>
          <h2 class="tasks-table__title">Users tasks</h2>
          <button class="tasks-table__button tasks-table__button--next">
            Next
          </button>
        </div>
        <div class="tasks-table__body"></div>
      </div>
    `;
  }

  update = (users: IUser[], tasks: ITask[], days: Date[]) => {
    const tableBody = document.querySelector(
      '.tasks-table__body'
    ) as HTMLDivElement;
    tableBody.innerHTML = '';

    days.forEach((day) => {
      const headerCell = document.createElement('div');
      headerCell.classList.add('tasks-table__header-cell');
      headerCell.innerHTML = formatDate(day);
      tableBody.append(headerCell);
    });

    users.forEach((user) => {
      const rowHeadCell = document.createElement('div');
      rowHeadCell.classList.add('tasks-table__cell', 'tasks-table__cell--head');
      rowHeadCell.dataset.userId = user.id.toString();
      rowHeadCell.innerHTML = `${user.surname} ${user.firstName}`;
      tableBody.append(rowHeadCell);

      days.forEach((day) => {
        const rowCell = document.createElement('div');
        rowCell.classList.add('tasks-table__cell');
        rowCell.dataset.userId = user.id.toString();
        rowCell.dataset.date = day.toISOString();

        const dayTasks = tasks.filter((task) => {
          const intervalStart = new Date(task.planStartDate);
          const intervalEnd = new Date(task.planEndDate);

          return (
            task.executor === user.id &&
            dateInInterval(day, intervalStart, intervalEnd)
          );
        });

        dayTasks.forEach((task) => {
          const taskContainer = document.createElement('div');
          taskContainer.classList.add('tasks-table__task');
          taskContainer.innerHTML = task.subject;
          rowCell.append(taskContainer);
        });

        tableBody.append(rowCell);
      });
    });
  };

  onNextClick(cb: () => void) {
    document
      .querySelector('.tasks-table__button--next')
      ?.addEventListener('click', cb);
  }

  onPrevClick(cb: () => void) {
    document
      .querySelector('.tasks-table__button--prev')
      ?.addEventListener('click', cb);
  }

  onDropListeners(cb: (taskId: string, userId: number, date?: string) => void) {
    const tableBody = document.querySelector(
      '.tasks-table__body'
    ) as HTMLDivElement;

    tableBody.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    tableBody.addEventListener('drop', (e) => {
      e.preventDefault();
      const cell = (e.target as HTMLHtmlElement).closest(
        '.tasks-table__cell'
      ) as HTMLDivElement;
      if (!cell) {
        return;
      }

      const taskId = e.dataTransfer?.getData('Text') || '';
      const { userId, date } = cell.dataset;

      cb(taskId, Number(userId), date);
    });
  }
}
