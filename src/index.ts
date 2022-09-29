import { fromEvent, map, pairwise } from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here

const myObservable = {
  observers: [],
  subscribe: function (observer) {
    this.observers.push(observer);
    let i = 0;
    setInterval(() => {
      i++;
      this.next(i);
    }, 1500);
  },
  next: function (value) {
    this.observers.forEach((o) => o.next(value));
  },
};

const btn$ = fromEvent(btn, 'click');

btn$
  .pipe(
    map((e) => e.timeStamp),
    pairwise(),
    map((clicks) => clicks[1] - clicks[0]),
    map((e) => e.toString())
  )
  .subscribe({
    next: (e) => print(e.toString()),
  });

// myObservable.subscribe({ next: (data) => console.log(data) });
