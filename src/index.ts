import { fromEvent, Subscription } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here
const event$ = fromEvent(btn, 'click');

const sub: Subscription = event$.subscribe((data) => print('Hellö Wöald!'));

setTimeout(() => {
  sub.unsubscribe();
}, 5000);
