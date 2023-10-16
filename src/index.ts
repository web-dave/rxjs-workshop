import { Observable, Observer, fromEvent, map, tap } from 'rxjs';

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

obs$
  .pipe(
    tap((data) => console.log(data)),
    map((data) => data.timeStamp),
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
