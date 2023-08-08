import fetch from 'node-fetch'; // browser에서는 생략(자체제공)  node> npm i node-fetch
// const sampleUrl = 'https://jsonplaceholder.typicode.com/users/1';
const myFetch = url => fetch(url).then(user => user.json());

// // myFetch를 이용하는 코드를 작성하시오.
// myFetch(sampleUrl).then(user => {
//   console.log('user>>>', user);
// });

async function request(url) {
  const response = await fetch(url);
  return response.json();
}

// try {
//   console.log('aaaaaa>>', await request(sampleUrl));
// } catch (err) {
//   console.error(err);
// }

// filter
const arr = [1, 2, 3];
const rets = arr.filter(async a => {
  const user = await request(`https://jsonplaceholder.typicode.com/users/${a}`);
  // console.log('user>>>', user.name);
  return user?.name.startsWith('C');
});

console.log('rets>>', rets);

const rets2 = (
  await Promise.all(
    arr.map(async a => {
      const user = await request(
        `https://jsonplaceholder.typicode.com/users/${a}`
      );
      // console.log('user>>>', user.name);
      return user?.name;
    })
  )
).filter(uname => uname.startsWith('C'));

console.log('rets2>>', rets2);
