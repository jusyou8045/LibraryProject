function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acctA, acctB) =>
    acctA.name.last > acctB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  const id = account.id;
  let count = 0;
  for (let book in books) {
    let currentBookLog = books[book].borrows;
    let matchingLog = currentBookLog.filter((item) => item.id == id);
    count += matchingLog.length;
  }
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  
  const searchId  = account.id;
  const foundBook = books.reduce((acc, book) => {
    let theBook = book.borrows.find((item) => item.id === searchId && item.returned === false);
    if(theBook){
      acc.push(book);
    }
    return acc;
  }, []);
  const results = foundBook.map((book) => {
    book['author'] = authors.find((author) => author.id === book.authorId);
    return book;
  });
  return results;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
