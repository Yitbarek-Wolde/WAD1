import Item from "../Item"
import { Todo } from "../../types/propTypes"
import './index.css'

export default function List(prop: {todos: Todo[]}) {
  return (
    <ul className="todo-main">
      {prop.todos?.map(todo => <Item key={todo.id} {...todo} /> )}
    </ul>
  )
}