import { useState } from 'react';
import './App.css';

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 0, content: '밥 먹기' },
    { id: 1, content: '코딩 공부하기' },
    { id: 2, content: '잠 자기' },
  ]);

  return (
    <>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
};

const TodoInput = (pr) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...pr.todoList, newTodo];
          pr.setTodoList(newTodoList);
          setInputValue('');
        }}
      >
        추가하기
      </button>
    </>
  );
};

const TodoList = (pr) => {
  return (
    <ul>
      {pr.todoList.map((el) => (
        <Todo key={el.id} todo={el} setTodoList={pr.setTodoList} />
      ))}
    </ul>
  );
};

const Todo = (pr) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <li>
      {pr.todo.content}
      <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button
        onClick={() => {
          pr.setTodoList((prev) => {
            return prev.map((el) => (el.id === pr.todo.id ? { ...el, content: inputValue } : el));
          });
        }}
      >
        수정
      </button>
      <button
        onClick={() => {
          pr.setTodoList((prev) => prev.filter((el) => el.id !== pr.todo.id));
        }}
      >
        삭제
      </button>
    </li>
  );
};

export default App;
