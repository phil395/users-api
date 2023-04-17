import { Prisma } from "@prisma/client";

export const users: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@gmail.com",
    loginAt: "2021-08-15T22:33:52.991Z",
    password: "$2b$10$jsNxMCdFR0rFwlmTtNJigu8jFvpS4p5ps.MG2umOnjCtYQC.Z2sI2", // alice01
    status: "Active",
    createdAt: "2021-04-22T05:13:38.768Z"
  },
  {
    name: "Bob",
    email: "bob@gmail.com",
    loginAt: "2022-08-17T22:33:52.991Z",
    password: "$2b$10$hyDYbjv1fOYzyOU1KsOzUeW39fTSqkOtq90TbKbfIxOeKFZpdgSDG", // 12345
    status: "Active",
    createdAt: "2020-03-25T07:17:38.768Z"
  },
  {
    name: "Jon",
    email: "jon@gmail.com",
    loginAt: "2023-02-15T16:33:52.991Z",
    password: "$2b$10$nvqTvTQ81b355bSMBZsmZu8ldTJIrTMzZu/ohBXT45b4y8r3D8bnq", // qwerty
    status: "Active",
    createdAt: "2022-07-15T01:23:38.768Z"
  }
]