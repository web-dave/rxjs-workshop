import {
  catchError,
  concatMap,
  debounceTime,
  filter,
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
import { ajax, AjaxResponse } from 'rxjs/ajax';
// import { WebSocketSubject } from 'rxjs/webSocket';

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

// interface Iuser

function transformResponseToList(keys: string[]) {
  return pipe(
    map((users: { [key: string]: string }[]) =>
      users.map((u) => keys.map((key) => u[key]).join(','))
    )
  );
}

search$
  .pipe(
    map((evt) => input.value),
    debounceTime(300),
    switchMap((searchTerm) =>
      ajax
        .getJSON<{ [key: string]: string }[]>(
          `http://localhost:3000/users?q=${searchTerm}`
        )
        .pipe(retry({ count: 3, delay: 3000, resetOnSuccess: true }))
    ),
    // retry({ count: 3, delay: 3000, resetOnSuccess: true }),
    catchError((err) => of([{ first_name: false }])),
    filter((list) => list.length == 0 || !!list[0].first_name),
    transformResponseToList(['first_name', 'last_name']),
    // map((data) => data.response),
    // map((users: any[]) => users.map((u) => `${u.first_name}, ${u.last_name}`)),
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

const observable = {
  listener: null,
  subscribe: async (observer) => {
    observable.listener = observer;

    const res = await fetch('http://localhost:3000/users?q=hal');
    observable.next(res);
  },
  next: (value) => observable.listener.next(value),
};

observable.subscribe({ next: (data) => console.log('1===>', data) });
observable.subscribe({ next: (data) => console.log('2===>', data) });

// setTimeout(() => observable.next('Hallo'), 2000);

// coding start here
