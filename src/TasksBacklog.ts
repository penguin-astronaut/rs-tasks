import { ITask } from './types';

export class TasksBacklog {
  constructor() {
    const wrapper = document.querySelector('.wrapper') as HTMLDivElement;

    wrapper.insertAdjacentHTML(
      'beforeend',
      `
     <div class="backlog">
        <h2 class="backlog__title">Backlog</h2>
        <input
          type="text"
          class="backlog__search"
          placeholder="Текст или заголовок задачи"
        />
        <ul class="backlog-tasks"></ul>
     </div>
    `
    );
  }

  update(tasks: ITask[]) {
    const tasksList = document.querySelector(
      '.backlog-tasks'
    ) as HTMLUListElement;

    tasksList.innerHTML = '';

    tasks.forEach((task) => {
      const liElem = document.createElement('li');
      liElem.classList.add('backlog-tasks__item');

      const taskElem = document.createElement('div');
      taskElem.classList.add('backlog-task');

      const taskTitleElem = document.createElement('div');
      taskTitleElem.classList.add('backlog-task__title');
      taskTitleElem.innerHTML = task.subject;

      const taskDescElem = document.createElement('p');
      taskDescElem.classList.add('backlog-task__text');
      taskDescElem.innerHTML = task.description || 'Нет описания';

      taskElem.append(taskTitleElem, taskDescElem);
      liElem.append(taskElem);
      tasksList.append(liElem);
    });
  }

  onInput(cb: (e: Event) => void) {
    const input = document.querySelector(
      '.backlog__search'
    ) as HTMLInputElement;
    input.addEventListener('input', cb);
  }
}
