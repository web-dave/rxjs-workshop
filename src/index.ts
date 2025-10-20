import { fromEvent, map, pairwise, tap } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

const button$ = fromEvent(btn, 'click');

button$
  .pipe(
    tap((data) => console.log(data)),
    map((data) => data.timeStamp),
    pairwise(),
    map(([prev, now]) => now - prev),
    map((ts) => `${ts}`)
  )
  .subscribe({
    next(value) {
      print(value);
    },
  });

// const observable = {
//   listener: null,
//   subscribe: (observer) => (observable.listener = observer),
//   next: (value) => observable.listener.next(value),
// };

// observable.subscribe({ next: (data) => console.log('===>', data) });

// setTimeout(() => observable.next('Hallo'), 2000);

// coding start here
