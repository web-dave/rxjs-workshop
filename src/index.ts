import { fromEvent, map, pairwise, Subscription, take } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here
const event$ = fromEvent(btn, 'click');

const timeStamp$ = event$.pipe(map((data) => data.timeStamp));

const timeDiff$ = timeStamp$.pipe(
  pairwise(),
  map(([curr, prev]) => prev - curr)
);

const event7$ = timeDiff$.pipe(take(7));

const sub: Subscription = event7$.subscribe((data) => print(data.toString()));

setTimeout(() => {
  sub.unsubscribe();
}, 5000);
