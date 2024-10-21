import {
  concatMap,
  debounceTime,
  exhaustMap,
  fromEvent,
  map,
  mergeMap,
  Observable,
  pairwise,
  PartialObserver,
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

const myObservable: Observable<string> = fromEvent(btn, 'click').pipe(
  tap((data) => console.log(data)),
  map((data) => data.timeStamp),
  take(7),
  tap((data) => console.log(data)),
  pairwise(),
  tap((data) => console.log(data)),
  map(([alt, neu]) => neu - alt),
  tap((data) => console.log(data)),
  map((data) => data + '')
);

myObservable.subscribe({
  next: (data) => print(data),
});

const input$: Observable<string> = fromEvent(input, 'input').pipe(
  debounceTime(500),
  map((e) => (e.target as HTMLInputElement).value)
);

const http$ = input$
  .pipe(
    switchMap((search) =>
      ajax('http://localhost:3000/users?first_name_like=' + search).pipe(
        map((data) => data.response)
      )
    ),
    tap((data) => console.log(data)),
    map((userList: any[]) =>
      userList.map((user) => user.first_name + ', ' + user.last_name)
    )
  )
  .subscribe((data) => data.forEach((name) => print(name)));
