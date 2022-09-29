import {
  fromEvent,
  map,
  mergeMap,
  pairwise,
  take,
  tap,
  concatMap,
  exhaustMap,
  switchMap,
  debounceTime,
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

const myObservable = {
  observers: [],
  subscribe: function (observer) {
    this.observers.push(observer);
    let i = 0;
    setInterval(() => {
      i++;
      this.next(i);
    }, 1500);
  },
  next: function (value) {
    this.observers.forEach((o) => o.next(value));
  },
};

// myObservable.subscribe({ next: (data) => console.log(data) });
// ------------------------------
const btn$ = fromEvent(btn, 'click');

btn$
  .pipe(
    map((e) => e.timeStamp),
    take(7),
    pairwise(),
    map((clicks) => clicks[1] - clicks[0]),
    map((e) => e.toString())
  )
  .subscribe({
    next: (e) => print(e.toString()),
  });

// ---------------------------

const input$ = fromEvent(input, 'input');
// mergeMap
// map
// concatMap
// exhaustMap
// switchMap
const call$ = input$.pipe(
  map((e: Event) => (e.target as HTMLInputElement).value),
  debounceTime(300),
  // alle requests werden nach einander ausgelöst evtl auch parallel
  // mergeMap((data) =>
  //   ajax.getJSON<any[]>('http://localhost:3000/users?first_name_like=' + data)
  // ),
  // concatiniert alle requests
  // concatMap((data) =>
  //   ajax.getJSON<any[]>('http://localhost:3000/users?first_name_like=' + data)
  // ),
  tap(console.log),
  // Ignoriert neue events solange innerer nicht completed ist
  // exhaustMap((data) =>
  //   ajax.getJSON<any[]>('http://localhost:3000/users?first_name_like=' + data)
  // )
  // cancelt request bei neuem event
  switchMap((data) =>
    ajax.getJSON<any[]>('http://localhost:3000/users?first_name_like=' + data)
  )
);
call$.subscribe();
