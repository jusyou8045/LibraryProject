function findAuthorById(authors, id) {
  let found = authors.find((author) => author.id === id);
  return found;
}

function findBookById(books, id) {
  let found = books.find((book) => book.id === id);
  return found;
}

function partitionBooksByBorrowedStatus(books) {
  let results = books.reduce(
    (acc, book) => {
      if (book.borrows[0].returned) {
        acc[1].push(book);
      } else {
        acc[0].push(book);
      }
      return acc;
    },
    [[], []]
  );
  return results;
}

//helper
function _getAcctById(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  for (let i in book.borrows) {
    result.push(_getAcctById(accounts, book.borrows[i].id));
  }
  for (let i in result) {
    for (let j in book.borrows) {
      result[i]["returned"] = book.borrows[j].returned;
    }
  }

  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
