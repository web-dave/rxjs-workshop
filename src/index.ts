import { fromEvent, PartialObserver } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

const myObservable = fromEvent(btn, 'click');

myObservable.subscribe({
  next: (data) => print('Hallo'),
});
