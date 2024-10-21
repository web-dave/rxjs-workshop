import {
  BehaviorSubject,
  catchError,
  concatMap,
  debounceTime,
  exhaustMap,
  fromEvent,
  map,
  mergeMap,
  Observable,
  of,
  pairwise,
  PartialObserver,
  pipe,
  retry,
  scan,
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
  // tap((time) => filter$$.next({ time })),
  map((data: number) => {
    filter$$.next({ time: data });
    return data + '';
  })
);

myObservable.subscribe({
  next: (data) => print(data),
});

function valueDebounceOperator() {
  return pipe(
    debounceTime(500),
    map((e: Event) => (e.target as HTMLInputElement).value)
  );
}

function errorHandlingOperator() {
  return pipe(
    retry({
      delay: 3000,
      count: 2,
      resetOnSuccess: true,
    }),
    catchError((err) => of([]))
  );
}

const input$: Observable<string> = fromEvent(input, 'input').pipe(
  valueDebounceOperator(),
  tap((text) => msg$$.next(text)),
  tap((text) => filter$$.next({ text }))
);

const http$ = input$
  .pipe(
    switchMap((search) =>
      ajax('http://localhost:3000/users?first_name_like=' + search).pipe(
        map((data) => data.response),
        errorHandlingOperator()
      )
    ),
    tap((data) => console.log(data)),
    map((userList: any[]) =>
      userList.map((user) => user.first_name + ', ' + user.last_name)
    )
  )
  .subscribe({
    next: (data) => data.forEach((name) => print(name)),
    error: (err) => console.error('Ouch', err),
  });

const msg$$ = new BehaviorSubject<string>('');

msg$$.subscribe((data) => console.log('msg', data));

const filter$$ = new BehaviorSubject<{ time?: number; text?: string }>({
  time: 0,
  text: '',
});

const allFilters$ = filter$$.pipe(
  scan((next, prev) => {
    return { ...next, ...prev };
  })
);

allFilters$.subscribe((data) => console.log(data));
