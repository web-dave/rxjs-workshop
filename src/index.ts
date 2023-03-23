import { fromEvent, map, Subscription } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here
const event$ = fromEvent(btn, 'click');

const sub: Subscription = event$
  .pipe(map((data) => data.timeStamp))
  .subscribe((data) => print(data.toString()));

setTimeout(() => {
  sub.unsubscribe();
}, 5000);
