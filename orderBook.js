function findMatch(existingBook, incomingOrder) {
  return existingBook.filter(bookItem => (bookItem.type !== incomingOrder.type)
    && !((bookItem.price !== incomingOrder.price) && (bookItem.quantity !== incomingOrder.quantity)))
}

function filterMatch(existingBook, incomingOrder) {
  return existingBook.filter(bookItem => (bookItem.type === incomingOrder.type)
    && (bookItem.quantity <= incomingOrder.quantity)
    && (bookItem.price === incomingOrder.price))
}


function reconcileOrder(existingBook, incomingOrder) {
  const filteredBook = findMatch(existingBook, incomingOrder)

  if (filteredBook.length) {


    if ((filteredBook[0].quantity !== incomingOrder.quantity)) {
      let updatedBook = filterMatch(existingBook, incomingOrder)

      const updatedOrder = {
        type: ((filteredBook[0].quantity > incomingOrder.quantity) ? filteredBook[0].type : incomingOrder.type),
        quantity: Math.abs(filteredBook[0].quantity - incomingOrder.quantity),
        price: ((filteredBook[0].price > incomingOrder.price) ? filteredBook[0].price : incomingOrder.price)
      }

      updatedBook = [...updatedBook, updatedOrder]
      return updatedBook

    } else {
      let updatedBook = filterMatch(existingBook, incomingOrder)
      return updatedBook
    }

  } else {
    let updatedBook = [...existingBook, incomingOrder]
    return updatedBook

  }
}

module.exports = reconcileOrder