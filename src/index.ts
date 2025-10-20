import {
  concatMap,
  debounceTime,
  fromEvent,
  map,
  mergeMap,
  pairwise,
  switchMap,
  take,
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

const button$ = fromEvent(btn, 'click');

const search$ = fromEvent(input, 'input');

search$.pipe(map((evt) => (evt.target as HTMLInputElement).value));

search$
  .pipe(
    map((evt) => input.value),
    debounceTime(300),
    switchMap((searchTerm) =>
      ajax(`http://localhost:3000/users?q=${searchTerm}`)
    ),
    map((data) => data.response),
    map((users: any[]) => users.map((u) => `${u.first_name}, ${u.last_name}`)),
    tap(() => (output.innerHTML = ''))
  )
  .subscribe({
    next(names: string[]) {
      names.forEach((name) => print(name));
    },
  });

const sub = button$
  .pipe(
    take(7),
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
    complete() {
      console.log('Tschö', sub);
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
