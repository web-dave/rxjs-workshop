import {
  debounceTime,
  filter,
  fromEvent,
  map,
  Observable,
  pairwise,
  Subscription,
  switchMap,
  mergeMap,
  exhaustMap,
  concatMap,
  take,
  tap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

const btn = document.querySelector('button');
const searchField = document.querySelector('input');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here
const event$ = fromEvent(btn, 'click');

const timeStamp$ = event$.pipe(map((data) => data.timeStamp));

const timeDiff$ = timeStamp$.pipe(
  pairwise(),
  map(([curr, prev]) => prev - curr)
);

const event7$ = timeDiff$.pipe(take(7));

const sub: Subscription = event7$.subscribe((data) => print(data.toString()));

const usersReq$ = ajax({
  method: 'GET',
  url: 'http://localhost:3000/users?first_name=Arlina',
  responseType: 'json',
});

const search$: Observable<string> = fromEvent(searchField, 'input').pipe(
  map((event) => (event.target as HTMLInputElement).value)
);

// search$.subscribe((data) => console.log(data));

search$
  .pipe(
    // debounceTime(300),
    exhaustMap((data) =>
      ajax<any>({
        method: 'GET',
        url: `http://localhost:3000/users?first_name_like=${data}`,
        responseType: 'json',
      }).pipe(
        filter((data) => data.response.length >= 1),
        map((data) => data.response),
        map((users) => users.map((u) => u['first_name'])),
        tap(console.log)
      )
    )
  )
  .subscribe((data: string[]) => data.forEach((u) => print(u)));
// const userList$: Observable<string[]>

// search$.pipe().subscribe((data) => print(data.toString()));
