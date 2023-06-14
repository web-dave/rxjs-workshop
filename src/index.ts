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
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

const btn = document.querySelector('button');
const input = document.querySelector('input');
const output = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}
// coding start here

const input$ = fromEvent(input, 'input');
const searchStr$: Observable<string> = input$.pipe(
  map((data) => (data.target as HTMLInputElement).value)
);

searchStr$
  .pipe(
    // debounceTime(300),
    switchMap((data) =>
      ajax<any[]>('http://localhost:3000/user?first_name_like=' + data).pipe(
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
