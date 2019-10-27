function findMatch(existingBook, incomingOrder) {
  return existingBook.filter(bookItem => (bookItem.type !== incomingOrder.type))
}

function filterMatch(existingBook, incomingOrder) {
  return existingBook.filter(bookItem => (bookItem.type === incomingOrder.type)
    && (bookItem.quantity <= incomingOrder.quantity)
    && (bookItem.price === incomingOrder.price))
}

function reconcileOrder(existingBook, incomingOrder) {
  let updatedBook
  const filteredBook = findMatch(existingBook, incomingOrder)

  if (filteredBook.length || (filteredBook[0].price != incomingOrder.price)) {
    if (filteredBook[0].quantity < incomingOrder.quantity && filteredBook[0].price >= incomingOrder.price) {

      updatedBook = filterMatch(existingBook, incomingOrder)

      /*let updatedIncomingOrder = {
        type: incomingOrder.type,
        quantity: (incomingOrder.quantity - filteredBook[0].quantity),
        price: incomingOrder.price
      }*/

      let updatedIncomingOrder = { quantity: (incomingOrder.quantity - filteredBook[0].quantity), ...incomingOrder }

      return updatedBook = [...updatedBook, updatedIncomingOrder]

    } else if (filteredBook[0].quantity > incomingOrder.quantity && filteredBook[0].price >= incomingOrder.price) {

      updatedBook = filterMatch(existingBook, incomingOrder)

      let updatedFilteredBookOrder = {
        type: filteredBook[0].type,
        quantity: (filteredBook[0].quantity - incomingOrder.quantity),
        price: filteredBook[0].price
      }

      return updatedBook = [...updatedBook, updatedFilteredBookOrder]

    } else if (filteredBook[0].quantity === incomingOrder.quantity) {
      return updatedBook = filterMatch(existingBook, incomingOrder)
    }

  } else {

    return updatedBook = [...existingBook, incomingOrder]

  }
}

module.exports = reconcileOrder