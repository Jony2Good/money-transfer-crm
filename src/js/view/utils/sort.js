/**
 * в функцию приходит список счетов
 * и event.target - элемент по которому произошло событие click в selecte
 * @param {Array} list
 * @param {DOM-element with dataset} sort
 */
export default function sortList(list, obj) {
  return list.sort((a, b) => {
    switch (obj.sort) {
      case "byNumber":
        return a.account - b.account;
      case "byBalance":
        return a.balance - b.balance;
      case "byLastTransaction":
        return (
          (a.transactions[0] ? new Date(a.transactions[0].date) : Date.now()) -
          (b.transactions[0] ? new Date(b.transactions[0].date) : Date.now())
        );
    }
  });
}
