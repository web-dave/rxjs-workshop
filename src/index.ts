import {
  concatMap,
  exhaustMap,
  fromEvent,
  interval,
  map,
  mergeMap,
  pairwise,
  switchMap,
  take,
  takeUntil,
  tap,
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

// Trigger
const trigger$ = fromEvent(input, 'input');

// Source
const source$ = (n: string) =>
  ajax.get('http://localhost:3000/users?last_name_like=' + n);

trigger$
  .pipe(
    map((evt: MouseEvent) => (evt.target as HTMLInputElement).value),
    tap((data) => console.log(data)),
    exhaustMap((data) => source$(data)),
    tap((data) => console.log(data))
  )
  .subscribe();

const click$ = fromEvent(btn, 'click');
interval(1000).pipe(takeUntil(click$));
// .subscribe({ next: (d) => console.info(d) });
click$
  .pipe(
    take(7),
    tap((data) => console.log(data)),
    map((evt) => evt.timeStamp),
    tap((data) => console.log(data)),
    pairwise(),
    tap((data) => console.log(data)),
    map(([prev, click]) => click - prev),
    tap((data) => console.log(data))
  )
  .subscribe({
    next: (tm: number) => {
      // console.log(evt);
      print(tm.toString());
    },
  });

//------------------------------------------

const myObservable = {
  observers: [],
  subscribe: function (observer) {
    myObservable.observers.push(observer);
    myObservable.next('Hallo');
  },
  next: function (data: any) {
    myObservable.observers.forEach((o) => o.next(data));
  },
};

myObservable.subscribe({ next: (foo) => console.log(foo) });

myObservable.next('Tschö mit Ö');
