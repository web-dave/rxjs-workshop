import {
  fromEvent,
  map,
  pairwise,
  switchMap,
  concatMap,
  exhaustMap,
  mergeMap,
  take,
  tap,
  pipe,
  retry,
  catchError,
  of,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

function print2(text: string[]) {
  output.innerHTML = '';
  text.forEach((t) => {
    const li: HTMLLIElement = document.createElement('li');
    li.innerText = t;
    output.appendChild(li);
  });
}

// coding start here
const myObservable = {
  observer: null,
  subscribe: (observer: any) => {
    myObservable.observer = observer;
    setInterval(() => myObservable.observer.next('Hello'), 1500);
  },
};
// myObservable.subscribe({
//   next: (data) => console.log('next', data),
// });
const btn$ = fromEvent(btn, 'click');

// btn$.subscribe({ next: (data) => console.log('BTN', data) });
// btn$
//   .pipe(
//     pluck('timeStamp'),
//     map(data => data.toString())
//     )
//   .subscribe((data) => print(data));

function timeGoneBye() {
  return pipe(
    map((data: any) => data.timeStamp),
    take(7),
    pairwise(),
    map(([prev, curr]) => curr - prev),
    map((data) => data.toString())
  );
}

btn$.pipe(timeGoneBye()).subscribe((data) => print(data));

const input = document.querySelector('input');
const input$ = fromEvent(input, 'input');

input$
  .pipe(
    map((data) => (data.target as HTMLInputElement).value),
    switchMap((data) =>
      ajax<{ [key: string]: string }[]>(
        'http://localhost:3000/users?last_name_like=' + data
      ).pipe(
        tap(console.log),
        map((data) => data.response.map((u) => u['last_name'])),
        retry({ delay: 1500, resetOnSuccess: true, count: 3 }),
        catchError((err) => of(['Hallo', 'Schaeffler']))
      )
    )
  )
  .subscribe({ next: (data) => print2(data) });

// error Handling
const users$ = ajax<{ [key: string]: string }[]>(
  'http://localhost:3000/user'
).pipe(map((response) => response.response));

users$
  .pipe(
    retry({ delay: 1500, resetOnSuccess: true, count: 3 }),
    catchError((err) => of(['Hallo', 'Schaeffler']))
  )
  .subscribe({ next: (data) => console.log(data) });
