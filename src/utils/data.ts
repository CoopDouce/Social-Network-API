import { Types } from "mongoose";

const usernames = ["Cooper", "Makenna", "Payton"];

const thoughtTexts = [
  "Good Morning!",
  "I love working on the front end",
  "I love cheese",
];
const reactions = ["W thought", "Thats not true", "Same here!"];

const getRandomArrItem = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomThoughts = () => {
  return [
    {
      thoughtText: getRandomArrItem(thoughtTexts),
      username: "Cooper",
      reactions: getThoughtReactions(1),
    },
    {
      thoughtText: getRandomArrItem(thoughtTexts),
      username: "Makenna",
      reactions: [],
    },
  ];
};

const getThoughtReactions = (numReactions: number) => {
  const reactionsArr = [];

  for (let i = 0; i < numReactions; i++) {
    reactionsArr.push({
      reactionId: new Types.ObjectId(),
      reactionBody: getRandomArrItem(reactions),
      username: getRandomArrItem(usernames),
    });
  }

  return reactionsArr;
};

const getRandomUsers = (thoughtIds: Types.ObjectId[]) => {
  const makennaId = new Types.ObjectId();
  return [
    {
      username: "Cooper",
      email: "Cooper@gmail.com",
      thoughts: [thoughtIds[0]],
      friends: [],
    },
    {
      username: "Makenna",
      email: "Makenna@gmail.com",
      thoughts: [thoughtIds[1]],
      friends: [makennaId],
    },
    {
      _id: makennaId,
      username: "Payton",
      email: "Payton@gmail.com",
      thoughts: [],
      friends: [],
    },
  ];
};

export { getRandomUsers, getRandomThoughts };