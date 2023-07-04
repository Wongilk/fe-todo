const todos = require("./todosList.js");

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printStatus = () => {
  console.log(
    `현재 상태: todo: ${findStatus("todo").length}개, doing: ${
      findStatus("doing").length
    }개, done: ${findStatus("done").length}개`
  );
};

const findStatus = (type) => {
  return todos.filter((value) => value["status"] === type);
};

const findDupId = (id) => {
  let dupIds = todos.filter((value) => value["id"] === id);
  return dupIds.length === 0;
};

const makeId = () => {
  return Math.floor(Math.random() * (100_000_000 - 1) + 1);
};
const showItems = (type) => {
  if (type === "all") {
    printStatus();
  } else {
    const list = findStatus(type);
    console.log(`${type} 리스트: 총 ${list.length}건 :`);
    list.forEach((value) => {
      console.log(`'${value.name}, ${value.id}번'`);
    });
  }
};
const addItems = (name, tags) => {
  let newId = makeId();
  while (!findDupId(newId)) {
    newId = makeId();
  }
  let obj = {
    name: name,
    tags: tags,
    status: "todo",
    id: newId,
  };
  todos.push(obj);
  console.log(`${name}개가 추가됐습니다.(id : ${newId})`);
  printStatus();
};
const deleteItems = (id) => {
  todos.forEach((value, index) => {
    if (value["id"] === Number(id)) {
      todos.splice(index, 1);
      console.log(`${value.name} ${value.status}가 목록에서 삭제됐습니다.`);
      printStatus();
    }
  });
};
const updateItems = (id, status) => {
  todos.forEach((value) => {
    if (value["id"] === Number(id)) {
      value["status"] = status;
      console.log(`${value.name} ${value.status}으로 상태가 변경됐습니다.`);
      printStatus();
    }
  });
};

const processCommand = (line) => {
  const cmd = line.split("$")[0];
  if (cmd === "show") {
    const type = line.split("$")[1];
    showItems(type);
  } else if (cmd === "add") {
    const name = line.split("$")[1];
    const tags = line.split("$")[2];
    addItems(name, tags);
  } else if (cmd === "delete") {
    const id = line.split("$")[1];
    deleteItems(id);
  } else if (cmd === "update") {
    const id = line.split("$")[1];
    const status = line.split("$")[2];
    updateItems(id, status);
  } else if (cmd === "end") {
    rl.close();
    return;
  }
  rl.prompt();
};

rl.setPrompt("명령하세요 : ");
rl.prompt();

rl.on("line", (line) => {
  processCommand(line);
});

rl.on("close", () => {
  // 입력이 끝난 후 실행할 코드
  process.exit();
});
