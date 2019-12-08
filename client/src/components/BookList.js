import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from '../queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const [selected, setSelected] = useState("5de94d324b523c473645455a")
  const { loading, error, data } = useQuery(getBooksQuery);
  return (
    <div>
      <ul id="book-list">
        { loading ? <div>Loading books...</div> 
        : error ? <div> Error loading books. Refresh and Check Again</div>
        : data.books.map(({ name, id }) => (<li key={id} onClick={ (e) => { setSelected(id) } }>{ name }</li>))
        }
      </ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export default BookList;
