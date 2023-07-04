const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todos = [
  {
    name: "자바스크립트 공부하기",
    tags: ["programming", "javascript"],
    status: "todo",
    id: 1,
  },
  {
    name: " 그림 그리기",
    tags: ["picture", "favorite"],
    status: "doing",
    id: 2,
  },
];
let flag = 1;

const findTodo = () => {
  let rev = todos.filter((value) => value["status"] === "todo");
  return rev;
};

const findDoing = () => {
  let rev = todos.filter((value) => value["status"] === "doing");
  return rev;
};

const findDone = () => {
  let rev = todos.filter((value) => value["status"] === "done");
  return rev;
};

const findDupId = (id) => {
  let rev = todos.filter((value) => value["id"] === id);
  return rev.length === 0 ? true : false;
};

const recursiveReadline = () => {
  rl.setPrompt("명령하세요 : ");
  rl.prompt();
  let line;
  rl.on("line", (input) => {
    line = input;

    const cmd = line.split("$")[0];

    if (cmd === "show") {
      const type = line.split("$")[1];
      if (type === "all") {
        console.log(
          `현재 상태 : todo: ${findTodo().length}개, doing: ${
            findDoing().length
          }개, done: ${findDone().length}개`
        );
      } else if (type === "todo") {
        console.log(`todo리스트 : 총${findTodo().length}건 :`);
        findTodo().forEach((value) => {
          console.log(`'${value.name}, ${value.id}번'`);
        });
      } else if (type === "doing") {
        console.log(`doing리스트 : 총${findDoing().length}건 :`);
        findDoing().forEach((value) => {
          console.log(`'${value.name}, ${value.id}번'`);
        });
      } else if (type === "done") {
        console.log(`done리스트 : 총${findDone().length}건 :`);
        findDone().forEach((value) => {
          console.log(`'${value.name}, ${value.id}번'`);
        });
      }
    } else if (cmd === "add") {
      let name = line.split("$")[1];
      let tag = line.split("$")[2];
      let newId = Math.floor(Math.random() * (100000000 - 1) + 1);
      console.log(newId);
      while (!findDupId(newId)) {
        console.log(newId);
        newId = Math.floor(Math.random() * (100000000 - 1) + 1);
      }
      let obj = {
        name: name,
        tags: tag,
        status: "todo",
        id: 0,
      };
      todos.push(obj);
    } else if (cmd === "delete") {
    } else if (cmd === "update") {
    } else if (cmd === "end") {
      return false;
    }
    return true;

    rl.close();
  });
  rl.on("close", () => {
    // 입력이 끝난 후 실행할 코드
    process.exit();
  });
};

let input;

while (flag) {
  recursiveReadline() ? (flag = 1) : (flag = 0);
}
