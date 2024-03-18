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
    myObservable.observers.push(observer);
    myObservable.next('Hallo');
  },
  next: function (data: any) {
    myObservable.observers.forEach((o) => o.next(data));
  },
};

myObservable.subscribe({ next: (foo) => console.log(foo) });
