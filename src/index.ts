import { fromEvent, map, pairwise, tap } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}
// coding start here

const click$ = fromEvent(btn, 'click');
click$
  .pipe(
    tap((data) => console.log(data)),
    map((evt) => evt.timeStamp),
    tap((data) => console.log(data)),
    pairwise(),
    tap((data) => console.log(data)),
    map(([prev, click]) => click - prev),
    tap((data) => console.log(data))
  )
  .subscribe({
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
