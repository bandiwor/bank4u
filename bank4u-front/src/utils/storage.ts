type SetOptions = {
  path?: string,
  expires?: Date | number,
}

type GetOptions = {
  ignoreExpired?: boolean,
  ignorePathMismatch?: boolean,
  rawValue?: boolean,
  throwErrorIfNotFound?: boolean,
}

type PopOptions = GetOptions;

type HasOptions = Omit<GetOptions, 'rawValue'>

type Item = SetOptions & {
  value: string
  expires?: number
}

type MatchPathFunction = (path: string) => boolean;
type DeleteOptions = Pick<HasOptions, 'throwErrorIfNotFound'>

const matchPathDefault: MatchPathFunction = (path) => {
  return location.pathname === path;
}

export default function storage(thisStorage: Storage = localStorage, matchPathFunction: MatchPathFunction = matchPathDefault) {
  return {
    set<T extends unknown>(name: string, value: T, options?: SetOptions): void {
      let item: Item = {
        value: JSON.stringify(value)
      }

      if (options) {
        if (options.path) {
          item.path = options.path
        }
        if (options.expires instanceof Date) {
          item.expires = options.expires.getDate();
        } else if (typeof options.expires === 'number') {
          item.expires = options.expires;
        }
      }

      thisStorage.setItem(name, JSON.stringify(item));
    },
    setDefault<T extends unknown>(name: string, value: T, options?: SetOptions): void {
      if (!this.has(name)) {
        this.set(name, value, options)
      }
    },
    has(name: string, options?: HasOptions): boolean {
      const matched = thisStorage.getItem(name);
      if (matched === null) {
        if (options?.throwErrorIfNotFound) {
          throw new Error(`Element ${name} not found.`)
        }
        return false;
      }

      let parsedValue: Item;
      try {
        parsedValue = JSON.parse(matched);
      } catch {
        return true;
      }

      if (!options?.ignoreExpired && parsedValue.expires && parsedValue.expires <= Date.now()) {
        if (options?.throwErrorIfNotFound) {
          throw new Error(`Element ${name} not found.`)
        }
        return false;
      }

      if (!options?.ignorePathMismatch && parsedValue.path && !matchPathFunction(parsedValue.path)) {
        if (options?.throwErrorIfNotFound) {
          throw new Error(`Element ${name} not found.`)
        }
        return false;
      }

      return true;
    },
    get<T extends unknown>(name: string, options?: GetOptions): T | undefined {
      const item = thisStorage.getItem(name);

      if (!this.has(name, options)) {
        try {
          const parsedItem: Item = JSON.parse(item!);
          return parsedItem.value as T;
        } catch {
          return item! as T;
        }
      }
      return undefined;
    },
    delete(name: string, options?: DeleteOptions) {
      if (this.has(name, options)) {
        thisStorage.removeItem(name)
        return true;
      }
      return false;
    },
    pop<T extends unknown>(name: string, options?: PopOptions): T | undefined {
      const item = thisStorage.getItem(name);
      if (this.has(name, options)) {
        try {
          const parsedItem: Item = JSON.parse(item!);
          this.delete(name);
          return parsedItem as T;
        } catch {
          return item! as T;
        }
      }
      return undefined;
    },
  }
}