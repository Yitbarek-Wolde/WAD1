import { Todo } from '../../types/propTypes'
import './index.css'

export default function Item(prop: Todo) {
  return (
    <li>
      <label>
        <input type="checkbox" />
        <span>{prop.name}</span>
      </label>
      <button className="btn btn-danger" style={{ display: 'none' }}>Delete</button>
    </li>
  )
}