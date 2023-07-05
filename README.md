# fe-todo

js를 이용한 간단한 todo list 관리 프로그램입니다.
상태 => todo, doing, done

# 기능

- show
  현재 list내에 있는 todo를 보여줍니다.
  명령어 형식 : show$type
  type => all, todo, doing, done

- add
  list내에 새로운 todo를 추가합니다.
  명령어 형식 : add$name$tags

- delete
  리스트내에 존재하는 todo를 삭제합니다.
  명령어 형식 : delete$id

- update
  리스트내에 존재하는 todo의 상태를 변경합니다.
  명령어 형식 : update$id$status

- end
  프로그램을 종료합니다.
