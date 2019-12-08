import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries';

const AddBook = () => {
  const [newBook, setNewBook] = useState({name: '', genre: '', authorId: ''});
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, { data: newData }] = useMutation(addBookMutation);

  const setBookValue = (field, value) => {
    return setNewBook(prevBookDetail => ({ ...prevBookDetail, [field]: value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newBook)
    const newAddedBook = await addBook({ variables: newBook, refetchQueries: [{ query: getBooksQuery }] })
    console.log(newAddedBook, newData);
  }

  return (
    <div>
      <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={ (e) => setBookValue('name', e.target.value) } />
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={ (e) => setBookValue('genre', e.target.value) } />
        </div>
        <div className="field">
            <label>Author:</label>
            <select onChange={ (e) => setBookValue('authorId', e.target.value) } >
                <option>Select author</option>
                { loading ? <option disabled>Loading authors...</option> 
                  : error ? <option disabled> Error loading authors. Refresh and Check Again</option>
                  : data.authors.map(({ name, id }) => (<option key={id} value={id}>{ name }</option>))
                }
            </select>
        </div>
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default AddBook;
