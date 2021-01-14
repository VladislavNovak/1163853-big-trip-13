export default class Store {
  constructor(key, storage) {
    this._storeKey = key;
    this._storage = storage;
  }

  getItems(storedType) {
    try {
      return JSON.parse(this._storage.getItem(`${this._storeKey}-${storedType}`)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(storedType, items) {
    this._storage.setItem(
        `${this._storeKey}-${storedType}`,
        JSON.stringify(items)
    );
  }

  setItem(storedType, id, value) {
    const store = this.getItems(storedType);

    this._storage.setItem(
        `${this._storeKey}-${storedType}`,
        JSON.stringify(
            Object.assign({}, store, {
              [id]: value
            })
        )
    );
  }

  removeItem(storedType, id) {
    const store = this.getItems(storedType);

    delete store[id];

    this._storage.setItem(
        `${this._storeKey}-${storedType}`,
        JSON.stringify(store)
    );
  }
}

// this._storeKey - название хранилища
// полный ключ формируется как `${this._storeKey}-${storedType}`
// this._storage - ссылка на само хранилище. Это может быть, к примеру, window.localStorage
