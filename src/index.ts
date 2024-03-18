import {
  BehaviorSubject,
  ReplaySubject,
  catchError,
  concatMap,
  exhaustMap,
  fromEvent,
  interval,
  map,
  mergeMap,
  of,
  pairwise,
  pipe,
  retry,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { eyeColor, IUser } from './eye-color.pipe';
import { timeDiff } from './time-diff.pipe';

const msg = document.querySelector('.msg');
const text = document.querySelector('textarea');
const btn = document.querySelector('button');
const input = document.querySelector('input');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}
// coding start here
const msgBuzz$$ = new ReplaySubject<string>(1);

const text$ = fromEvent(text, 'blur');
text$
  .pipe(map((evt: MouseEvent) => (evt.target as HTMLTextAreaElement).value))
  .subscribe({
    next: (data) => {
      msgBuzz$$.next(data);
      text.value = '';
    },
  });

msgBuzz$$.subscribe({
  next: (m) => {
    const h5 = document.createElement('h5');
    h5.innerText = m;
    msg.appendChild(h5);
    setTimeout(() => {
      msgBuzz$$.error('Help');
    }, 2000);
    setTimeout(() => {
      msgBuzz$$.subscribe({ next: (data) => console.log(data) });
    }, 4000);
  },
});

// Trigger
const trigger$ = fromEvent(input, 'input');

const source$ = (n: string) =>
  ajax.get('http://localhost:3000/users?last_name_like=' + encodeURI(n)).pipe(
    retry({ count: 3, delay: 3000, resetOnSuccess: true }),
    catchError((err) =>
      of({
        response: [
          {
            id: 1,
            first_name: 'Hyuitr',
            last_name: 'Knpftre',
            email: 'd;flgkj',
            gender: '',
            ip_address: '',
            eye_color: 'hotpink',
          },
        ],
      })
    )
  );
trigger$
  .pipe(
    map((evt: MouseEvent) => (evt.target as HTMLInputElement).value),
    switchMap((data) => source$(data)),

    tap((data) => console.log(data)),
    map((userList: any) => userList.response),
    tap((data: IUser[]) => console.log(data)),
    map((users) => users[0]),
    eyeColor()
  )
  .subscribe({
    next: (users) => {
      print(users);
      // output.innerHTML = '';
      // users.forEach((u) => print(u));
    },
  });

const click$ = fromEvent(btn, 'click');
interval(1000).pipe(takeUntil(click$));
// .subscribe({ next: (d) => console.info(d) });
click$.pipe(take(7), timeDiff()).subscribe({
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
