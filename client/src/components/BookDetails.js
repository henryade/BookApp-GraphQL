import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../queries';

const displayBookDetails = (book) => {
  const { name, genre, author: { name: authorName, books} } = book;
  return (
    <div>
      <hr/>
      <h2>{name}</h2>
      <p><span className="identifier">Genre: </span>{genre}</p>
      <p><span className="identifier">Author: </span>{authorName}</p>
      <p>All books by this author:</p>
      <ol className="other-books">
        { books.map(({ name, id}) => (<li key={id}>{name}</li>))}
      </ol>
      <hr/>
    </div>
  );
}

const BookDetails = ({ bookId }) => {
  const { data } = bookId === null ? useQuery(getBookQuery) : useQuery(getBookQuery, { variables: { id: bookId } });
  return (
    <div id="book-details">
      { data === undefined ? "No book selected..." : displayBookDetails(data.book)}
    </div>
  );
};

export default BookDetails;
