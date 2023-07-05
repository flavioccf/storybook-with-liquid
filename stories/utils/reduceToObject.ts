interface Item {
  id: string;
  default: any;
}

function reduceToObject(originalObject: Item[]): { [key: string]: any } {
  const reducedObject: { [key: string]: any } = {};

  for (const item of originalObject) {
    if (item.hasOwnProperty('default')) {
      reducedObject[item.id] = item.default;
    }
  }

  return reducedObject;
}


  export default reduceToObject;