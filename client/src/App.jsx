import { useState, useEffect } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import './App.css'

const App = () => {
  const [data, setData] = useState([])
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({
    userName: '',
    text: ''
  })
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState('')
  // const ApiUrl = "http://localhost:3000/api"
  const ApiUrl = "https://new-todoapp-backend.onrender.com/api"


  const getData = async () => {
    try {
      const Response = await axios.get(`${ApiUrl}/getTodo`, {
        params: { page, limit: 5 }
      })
      setData(Response.data.data)
      setTotalPage(Response.data.totalPage)
    } catch (error) {
      console.error("Error while getting error")
    }
  }

  useEffect(() => {
    getData()
  }, [page])

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await axios.put(`${ApiUrl}/updateTodo/${editId}`, form)
        toast.success("Detail Updated Successfully", {
          style: {
            color: 'white',
            backgroundColor: 'black'
          }
        })
      } else {
        await axios.post(`${ApiUrl}/createTodo`, form)
        toast.success("Data added Successfully..", {
          style: {
            color: 'white',
            backgroundColor: 'black'
          }
        })
      }

      setEditId(null)
      setForm({ userName: '', text: '' })
      getData()
    } catch (error) {
      console.error(error, "Error in the constant data")
      toast.error("Error in the constant data", {
        style: {
          color: 'white',
          backgroundColor: 'black'
        }
      })
    }
  }

  const handleEdit = (item) => {

    setForm({ userName: item.userName, text: item.text })
    setEditId(item._id)

  }
  const handleDelete = async (id) => {

    await axios.delete(`${ApiUrl}/deleteTodo/${id}`)
    toast.success("Deleted UserData", {
      style: {
        color: 'white',
        backgroundColor: 'black'
      }
    })
    getData()
  }
  return (
    <div>

      <h2>Mern Stack </h2>
      <input
        type="text"
        placeholder="Search by name or text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') getData();
        }}
      />
      <form onSubmit={handleSubmit}>
        <input type='text' name='userName' onChange={handleChange} value={form.userName} placeholder='userName...' />
        <input type='text' name='text' onChange={handleChange} value={form.text} placeholder='text...' />
        <button>{editId ? "Update" : "Add"}</button>
      </form>

      <table>
        <thead>
          <tr className='table-headings-row'>
            <th>S.No</th>
            <th>User Name</th>
            <th>Text</th>
            <th>Edit Button</th>
            <th>Delete Button</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr className='table-body-row' key={item._id}>
              <td>{i + 1}</td>
              <td>{item.userName}</td>
              <td>{item.text}</td>
              <td><button type='submit' onClick={() => handleEdit(item)}>Edit</button></td>
              <td><button type='submit' onClick={() => handleDelete(item._id)}>Delete</button></td>

            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Prv</button>
        <span>Page{page} of {totalPage} </span>
        <button onClick={() => setPage(p => Math.min(p + 1, totalPage))}>Next</button>

      </div>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

// const handleEdit = () => {

//   console.log();

// }
export default App
