import {
  catchError,
  concatMap,
  debounceTime,
  exhaustMap,
  filter,
  from,
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
  timer,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { fromFetch } from 'rxjs/fetch';

const btn = document.querySelector('button');
const searchInput = document.querySelector('input');
const output: HTMLUListElement = document.querySelector('ul');

const online$ = timer(100, 1000).pipe(
  map(() => window.navigator.onLine),
  filter((online) => online)
);
// .subscribe((data) => console.log('online', data));

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here
const myObserable = {
  observer: null,
  subscribe: function (observer) {
    myObserable.observer = observer;
    setTimeout(() => myObserable.next('Hallo'), 1500);
  },
  next: function (value) {
    myObserable.observer?.next(value);
  },
  error: function (err) {
    myObserable.observer.error(err);
    myObserable.observer = null;
  },
  complete: function () {
    myObserable.observer.complete();
    myObserable.observer = null;
  },
};
myObserable.subscribe({
  next: (data) => console.log(data),
  error: (err) => console.error(err),
  complete: () => console.log('Complete'),
});

// const foo = of([1,3,4,5,7,8,9,0]).pipe(
//   map(data => data.map())
// )

const button$ = fromEvent(btn, 'click');

const limitDiffOperator = (limit: number) => {
  return pipe(
    take(limit),
    map((data: Event) => data.timeStamp),
    tap((data) => console.log(data)),
    pairwise(),
    map(([prev, curr]) => curr - prev)
  );
};

button$
  .pipe(
    limitDiffOperator(7)
    // take(7),
    // map((data) => data.timeStamp),
    // tap((data) => console.log(data)),
    // pairwise(),
    // map(([prev, curr]) => curr - prev)
  )
  .subscribe({
    next: (data) => print(data + ''),
  });

const search$ = fromEvent(searchInput, 'input').pipe(
  debounceTime(300),
  map((event) => (event.target as HTMLInputElement).value)
);

search$
  .pipe(
    switchMap((serchTerm) =>
      // ajax({
      //   method: 'GET',
      //   url: 'http://localhost:3000/users?last_name_like=' + serchTerm,
      //   responseType: 'json',
      // }).pipe(map((responseObj) => responseObj.response))
      fromFetch('http://localhost:3000/users?last_name_like=' + serchTerm).pipe(
        retry({
          delay: (c) => online$,
          count: 3,
          resetOnSuccess: true,
        }),
        switchMap((response) => response.json()),
        catchError(() => of([])),
        tap((data) => console.log(data))
      )
    ),
    map((userList: any[]) => userList.map((user) => user.last_name))
  )
  .subscribe({
    next: (data) => {
      output.innerHTML = '';
      data.forEach((name) => print(name));
    },
  });
