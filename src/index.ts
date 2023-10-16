import {
  Observable,
  Observer,
  fromEvent,
  map,
  pairwise,
  take,
  tap,
  timer,
} from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here

const obs$ = fromEvent(btn, 'click');

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

// obs.next('Hallo');

// function myOperator<T>(op: Observable<T>): Observable<T>{
// fn
// return op
// }
