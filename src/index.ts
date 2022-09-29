import {} from 'rxjs';

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

myObservable.subscribe({ next: (data) => console.log(data) });
