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
  BehaviorSubject,
  debounceTime,
  scan,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { WebSocketSubject } from 'rxjs/webSocket';

export const getValueAndDelay = () =>
  pipe(
    map((data: Event) => (data.target as HTMLInputElement).value),
    debounceTime(300)
  );

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

const input = document.querySelector('.input_1');
const input$ = fromEvent(input, 'input');
const input2 = document.querySelector('.input_2');
const input2$ = fromEvent(input2, 'input');

interface IFilter {
  last_name?: string;
  first_name?: string;
}
const filter$$ = new BehaviorSubject<IFilter>({
  last_name: '',
  first_name: '',
});

filter$$
  .pipe(
    scan((acc, curr) => ({ ...acc, ...curr }), {
      last_name: '',
      first_name: '',
    })
  )
  .subscribe((data) => console.log(data));

input$
  .pipe(
    getValueAndDelay(),
    tap((data) => filter$$.next({ last_name: data }))
  )
  .subscribe();
input2$
  .pipe(
    getValueAndDelay(),
    tap((data) => filter$$.next({ first_name: data }))
  )
  .subscribe();
// input$
//   .pipe(
//     map((data) => (data.target as HTMLInputElement).value),
//     debounceTime(300),
//     tap((data) => ws.next(data)),
//     switchMap((data) =>
//       ajax<{ [key: string]: string }[]>(
//         'http://localhost:3000/users?last_name_like=' + data
//       ).pipe(
//         tap(console.log),
//         map((data) => data.response.map((u) => u['last_name'])),
//         retry({ delay: 1500, resetOnSuccess: true, count: 3 }),
//         catchError((err) => of(['Hallo', 'Schaeffler']))
//       )
//     )
//   )
//   .subscribe({ next: (data) => print2(data) });

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

const Message$$ = new BehaviorSubject<string>('');

Message$$.subscribe((data) => console.table(['Message', data]));

const ws = new WebSocketSubject({
  deserializer: (data) => data.data,
  url: 'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
});

// ws.pipe().subscribe((data) => console.table(['Message', data]));

[1, 4, 6].reduce((acc, curr) => {
  console.log(acc + curr);

  return acc + curr;
}, 0);
