import { fromEvent, map, pairwise, pluck, take } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here
const myObservable = {
  observer: null,
  subscribe: (observer: any) => {
    myObservable.observer = observer;
    setInterval(() => myObservable.observer.next('Hello'), 1500);
  },
};
const btn$ = fromEvent(btn, 'click');

btn$.subscribe({ next: (data) => console.log('BTN', data) });
// btn$
//   .pipe(
//     pluck('timeStamp'),
//     map(data => data.toString())
//     )
//   .subscribe((data) => print(data));
btn$
  .pipe(
    map((data) => data.timeStamp),
    take(7),
    pairwise(),
    map(([prev, curr]) => curr - prev),
    map((data) => data.toString())
  )
  .subscribe((data) => print(data));

// myObservable.subscribe({
//   next: (data) => console.log('next', data),
// });
