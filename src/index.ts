import { Observer } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here

const obs = {
  observer: null,
  value: '',
  subscribe: function (oberser: any) {
    obs.observer = oberser;
  },
  next: function (data: string) {
    obs.observer.next(data);
  },
};

obs.subscribe({
  next: (data) => console.log('===>', data),
});

obs.next('Hallo');
