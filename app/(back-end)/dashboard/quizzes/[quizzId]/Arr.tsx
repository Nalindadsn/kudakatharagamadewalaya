import React from "react";

function Arr({ items }: any) {
  const a: any = [
    {
      id: "1",
      name: "a1",
    },
    {
      id: "2",
      name: "a2",
    },
    {
      id: "3",
      name: "a3",
    },
  ];

  const b = [
    {
      id: "1",
      quizzId: "clzmen4rg00015q3yhcuucorr",
      questionId: "clzv72ywx005wvf5f1pcyvkja",
      questionOptionId: "clzv72ywx005xvf5fql96erbx",
      trueOrFalse: true,
    },
    {
      id: "2",
      quizzId: "clzmen4rg00015q3yhcuucorr",
      questionId: "clzv72ywx005wvf5f1pcyvkja",
      questionOptionId: "clzv72ywx005xvf5fql96erbx",
      trueOrFalse: true,
    },
    {
      id: "3",
      quizzId: "clzmen4rg00015q3yhcuucorr",
      questionId: "clzv72ywx005wvf5f1pcyvkja",
      questionOptionId: "clzv72ywx005xvf5fql96erbx",
      trueOrFalse: true,
    },
  ];

  const d = a.filter((i: any) => !b.find((f: any) => f.id === i.id));
  console.log(d);
  const it = items.quizzesSection.filter(
    (x: any) => x?.id == "clzmi5zcg00033ono4n5k5cpy"
  );

  const userAnswers = (id: any) => {
    return b.filter((i: any) => i.questionOptionId == id);
  };
  const sortQuestions = (array: any) => {
    const arr = array.map((m: any) => ({
      ...m,
      count: userAnswers(m?.id).length > 0 ? userAnswers(m?.id).length : 0,
    }));

    return arr;
  };

  const newdata = it[0]?.questions.map((d: any) => ({
    //  ...d,

    // options:      sortQuestions(d.questionOptions).sort(
    //   (p1:any, p2:any) => (p1.count > p2.count) ? 1 : (p1.count < p2.count) ? -1 : 0),
    // options:      sortQuestions(d.questionOptions)
    // optionGroup: groupBy(sortQuestions(d.questionOptions).sort(
    //   (p1:any, p2:any) => (p1.count > p2.count) ? 1 : (p1.count < p2.count) ? -1 : 0),"count"),
    // minCountGroup:Object(groupBy(sortQuestions(d.questionOptions).sort(
    //   (p1:any, p2:any) => (p1.count > p2.count) ? 1 : (p1.count < p2.count) ? -1 : 0),"count"))[0],
    randomOrder: getShuffledArr(
      Object(
        groupBy(
          sortQuestions(d.questionOptions).sort((p1: any, p2: any) =>
            p1.count > p2.count ? 1 : p1.count < p2.count ? -1 : 0
          ),
          "count"
        )
      )[0]
    )[0],
  }));

  const questionArray = newdata.map((x: any) => ({
    ...x.randomOrder,
  }));

  // const objs:any = [
  //   { first_nom: 'Lazslo',last_nom: 'Jamf' },
  //   { first_nom: 'Pig', last_nom: 'Bodine'  },
  //   { first_nom: 'Pirate', last_nom: 'Prentice' }
  // ];

  // const sortedObjs = objs.sortBy(objs, 'first_nom');

  function groupBy(arr: any, property: any) {
    return arr.reduce(function (memo: any, x: any) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }

  function getShuffledArr(arr: any) {
    return arr
      ? arr.reduce(
          (newArr: any, _: any, i: any) => {
            const rand = i + Math.floor(Math.random() * (newArr.length - i));
            [newArr[rand], newArr[i]] = [newArr[i], newArr[rand]];
            return newArr;
          },
          [...arr]
        )
      : [];
  }

  const products = [
    {
      product_name: "The Witchers",
      type: "book",
      manufactured: new Date("2019-05-13"),
      price: 800,
    },
    {
      product_name: "Black Heels",
      type: "Shoes",
      manufactured: new Date("2021-07-06"),
      price: 2500,
    },
    {
      product_name: "Skybags",
      type: "Bags",
      manufactured: new Date("2020-09-22"),
      price: 2200,
    },
    {
      product_name: "OnePlus 9",
      type: "Mobile Phone",
      manufactured: new Date("2021-03-23"),
      price: 49000,
    },
  ];
  console.log("Original Products are:");
  console.log(products);
  const sortedProducts = products.sort((p1, p2) =>
    p1.price < p2.price ? 1 : p1.price > p2.price ? -1 : 0
  );

  console.log("Products sorted based on descending order of their prices are:");
  console.log(sortedProducts);
  return (
    <div>
      {/* {JSON.stringify(sortedObjs)}<br/> */}
      {/* {JSON.stringify(d)} */}

      {JSON.stringify(questionArray)}
      <hr />
      {JSON.stringify(newdata)}
      <hr />
      {/* {newdata.map((x: any) => {
              return <>
              {x?.id}<br/>
              {x?.count}
              

              {x?.options.map((y: any) => {
              return <>
              --{y?.id}| {y?.count}<br/>
              
              
              
              </>}
)
}<hr/> 
              
             </>}
)
} */}
    </div>
  );
}

export default Arr;
