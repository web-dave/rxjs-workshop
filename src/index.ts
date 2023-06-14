import {
  Observable,
  catchError,
  concatMap,
  debounceTime,
  exhaustMap,
  fromEvent,
  map,
  mergeMap,
  of,
  pairwise,
  pipe,
  retry,
  switchMap,
  take,
  tap,
  BehaviorSubject,
  timer,
  takeUntil,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { WebSocketSubject } from 'rxjs/webSocket';

const btn = document.querySelector('button');
const terminator$ = fromEvent(document.querySelector('.terminator'), 'click');
const input = document.querySelector('input');
const output = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}
// coding start here

const msgBuzz$$ = new BehaviorSubject<string>('Täch');
const inputMsg = document.querySelector('.msg');
const msg$ = fromEvent(inputMsg, 'blur').pipe(
  map((data) => (data.target as HTMLInputElement).value)
);
msg$.subscribe({ next: (data) => msgBuzz$$.next(data.toUpperCase()) });

const foo$ = msgBuzz$$.asObservable();

msgBuzz$$.subscribe((data) => print(data));
msgBuzz$$.subscribe((data) => console.info(data));

// const ws = new WebSocketSubject(
//   'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self'
// );
// ws.subscribe((data) => console.log(data));
// ws.next('Hi!');

const input$ = fromEvent(input, 'input');
const searchStr$: Observable<string> = input$.pipe(
  map((data) => (data.target as HTMLInputElement).value)
);

searchStr$
  .pipe(
    // debounceTime(300),
    switchMap((data) =>
      ajax<any[]>('http://localhost:3000/users?first_name_like=' + data).pipe(
        retry({ delay: 1500, count: 2, resetOnSuccess: true }),
        catchError((err) => {
          console.error(err);
          return of({ response: [] });
        })
      )
    )
  )
  .subscribe({
    next: (result) => {
      console.log(result);
      output.innerHTML = '';
      result.response.forEach((user) => print(user.first_name));
    },
  });

const buttonObservable$ = fromEvent(btn, 'click');

// buttonObservable$.subscribe();
function myOperator() {
  return pipe(
    take(7),
    map((data: Event) => data.timeStamp),
    pairwise(),
    map((data: [number, number]) => data[1] - data[0]),
    map((hurz) => hurz.toString())
  );
}
const sub = buttonObservable$.pipe(myOperator()).subscribe({
  next: (data) => {
    print(data);
  },
  complete: () => print('Ich habe fertig'),
});
setInterval(() => {
  console.log(sub.closed);
}, 1500);

timer(1, 2000)
  .pipe(takeUntil(terminator$))
  .subscribe({
    next: (data) => console.log(data),
  });
// buttonObservable$.subscribe((data) => console.log(data));

// const myObservable = {
//   observer: null,
//   subscribe: function (obs) {
//     this.observer = obs;
//     ///////// Producer ///////
//     const i = setInterval(() => {
//       this.observer.next('Hallo');
//     }, 2000);
//     ///////
//     return function unsubscribe() {
//       clearInterval(i);
//     };
//   },
//   foo: () => {
//     console.log(this);
//     myObservable.observer.next('FOOO');
//   },
// };

// const sub = myObservable.subscribe({
//   next: (data) => console.log(data),
// });

// setTimeout(() => {
//   sub();
// }, 4500);

// myObservable.foo();
