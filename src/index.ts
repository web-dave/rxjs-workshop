import {
  Observable,
  Observer,
  concatMap,
  debounceTime,
  exhaustMap,
  fromEvent,
  map,
  mergeMap,
  pairwise,
  switchMap,
  take,
  tap,
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

const btn = document.querySelector('button');
const input = document.querySelector('input');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
  eye_color: string;
}

const inp$ = fromEvent(input, 'input').pipe(
  map((data) => (data.target as HTMLInputElement).value)
);

inp$
  .pipe(
    // debounceTime(500),
    exhaustMap((search) =>
      ajax<User[]>(
        'http://localhost:3000/users?first_name_like=' + search
      ).pipe(map((data) => data.response))
    ),
    map((data: User[]) => data.map((u) => u.first_name + ',' + u.last_name))
  )
  .subscribe({
    next: (data) => {
      data.forEach((u) => print(u));
    },
  });

const obs$ = fromEvent(btn, 'click');

obs$
  .pipe(
    map((data) => data.timeStamp),
    take(7),
    pairwise(),
    map((data) => data[1] - data[0]),
    // map(([acc, curr]) => curr - acc),
    map((data) => data + '')
  )
  .subscribe({
    next: (data) => print(data),
  });

// const obs = {
//   observer: null,
//   value: '',
//   subscribe: function (oberser: any) {
//     obs.observer = oberser;
//   },
//   next: function (data: string) {
//     obs.observer.next(data);
//   },
// };

// timer(1, 1)
//   .pipe(
//     tap((_) => btn.click()),
//     tap((data) => console.log(data))
//   )
//   .subscribe();

// obs.next('Hallo');

// function myOperator<T>(op: Observable<T>): Observable<T>{
// fn
// return op
// }
