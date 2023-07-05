const { todos } = require("./todosList.js");
const { status } = require("./todosList.js");

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
  const dupIds = todos.filter((value) => value["id"] === id);
  return dupIds.length === 0;
};

const makeId = () => {
  return Math.floor(Math.random() * (100_000_000 - 1) + 1);
};

const showItems = (type) => {
  if (type === "all") {
    printStatus();
  } else if (status.includes(type)) {
    const list = findStatus(type);
    console.log(`${type} 리스트: 총 ${list.length}건 :`);
    list.forEach((value) => {
      console.log(`'${value.name}, ${value.id}번'`);
    });
  } else {
    console.log("존재하지 않는 상태입니다.");
  }
};

const addItems = (name, tags) => {
  let newId = makeId();
  while (!findDupId(newId)) {
    newId = makeId();
  }
  const obj = {
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
  let findId = false;
  todos.forEach((value, index) => {
    if (value["id"] === Number(id)) {
      todos.splice(index, 1);
      console.log(`${value.name} ${value.status}가 목록에서 삭제됐습니다.`);
      printStatus();
      findId = true;
    }
  });
  findId ? "" : console.log("존재하지 않는 id입니다.");
};

const updateItems = (_id, _status) => {
  //상태값 체크
  let findId = false;
  if (!status.includes(_status)) {
    console.log("존재하지 않는 상태입니다.");
    return;
  }
  todos.forEach((value) => {
    if (value["id"] === Number(_id)) {
      value["status"] = _status;
      console.log(`${value.name} ${value.status}으로 상태가 변경됐습니다.`);
      printStatus();
      findId = true;
    }
  });
  findId ? "" : console.log("존재하지 않는 id입니다.");
};

//tag 올바른지 check
const checkTags = (tags) => {
  const regex = /^\[.*\]$/;
  return tags.match(regex);
};
const processCommand = (line) => {
  const cmd = line.split("$");
  if (cmd[0] === "show") {
    showItems(cmd[1]);
  } else if (cmd[0] === "add") {
    checkTags(cmd[2])
      ? addItems(cmd[1], cmd[2])
      : console.log("올바르지 않은 태그 형식입니다.");
  } else if (cmd[0] === "delete") {
    deleteItems(cmd[1]);
  } else if (cmd[0] === "update") {
    updateItems(cmd[1], cmd[2]);
  } else if (cmd[0] === "end") {
    rl.close();
    return;
  } else {
    console.log("잘못된 명령입니다.");
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
