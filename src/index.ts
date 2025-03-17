import { fromEvent, map, of, pairwise, tap } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

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

button$
  .pipe(
    map((data) => data.timeStamp),
    pairwise(),
    map(([prev, curr]) => curr - prev),
    tap((data) => console.log(data))
  )
  .subscribe({
    next: (data) => print(data + ''),
  });
