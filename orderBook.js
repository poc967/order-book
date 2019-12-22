function findMatch(existingBook, incomingOrder) {
  return existingBook.filter(bookItem => (bookItem.type !== incomingOrder.type)
    && !((bookItem.price !== incomingOrder.price) && (bookItem.quantity !== incomingOrder.quantity)))
}

function filterMatch(existingBook, incomingOrder) {
  return existingBook.filter(bookItem => (bookItem.type === incomingOrder.type)
    && (bookItem.quantity <= incomingOrder.quantity)
    && (bookItem.price === incomingOrder.price))
}

function priceDecider(existingPrice, incomingPrice) {
  const priceIndex = existingPrice - incomingPrice
  if (priceIndex >= 0) {
    return true
  }
}

function reconcileOrder(existingBook, incomingOrder) {
  const filteredBook = findMatch(existingBook, incomingOrder)

  if (filteredBook.length && priceDecider(filteredBook[0].price, incomingOrder.price)) {

    let updatedBook = filterMatch(existingBook, incomingOrder)

    const updatedOrder = {
      type: ((filteredBook[0].quantity > incomingOrder.quantity) ? filteredBook[0].type : incomingOrder.type),
      quantity: Math.abs(filteredBook[0].quantity - incomingOrder.quantity),
      price: ((filteredBook[0].price > incomingOrder.price) ? filteredBook[0].price : incomingOrder.price)
    }

    if (updatedOrder.quantity === 0) {
      return updatedBook
    } else {
      updatedBook = [...updatedBook, updatedOrder]
      return updatedBook
    }

  } else {
    let updatedBook = [...existingBook, incomingOrder]
    return updatedBook

  }
}

module.exports = reconcileOrder