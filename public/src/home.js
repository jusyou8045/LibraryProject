function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  let bList = [];
  for (let book in books) {
    bList.push(...books[book].borrows);
  }
  for (let val in bList) {
    if (bList[val].returned === false) count++;
  }
  return count;
}

function getMostCommonGenres(books) {
  let gList = books.reduce((acc, book) => {
    acc.push(book.genre);
    return acc;
  }, []);
  let count = gList.reduce((acc, genre) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

  let mostPop = [];
  for (const [key, values] of Object.entries(count)) {
    mostPop.push({ name: key, count: values });
  }

  mostPop.sort((genreA, genreB) => genreB.count - genreA.count);
  return mostPop.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popular = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  popular.sort((popA, popB) => popB.count - popA.count);
  return popular.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  
  let counted = books.reduce((acc, book) => {
    if (acc[book.authorId]){
     acc[book.authorId] += book.borrows.length;
    } else {
      acc[book.authorId] = book.borrows.length;
    } 
    return acc;
  },{});

  const poplist = Object.keys(counted).map((authorId)=> {
    let author = authors.find((author) => {
        return author.id == authorId;
    });
    return {
        name: `${author.name.first} ${author.name.last}`,
        count: counted[authorId],
    };
});
  poplist.sort((popA, popB) => popB.count - popA.count);
  const top5 = poplist.slice(0,5);
  return top5;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
