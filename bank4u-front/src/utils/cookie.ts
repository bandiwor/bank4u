type SetOptions = {
  expires?: number | Date
  path?: string
  onlyHttp?: boolean
}

export default function cookie() {
  return {
    set(name: string, value: string, options?: SetOptions) {
      let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

      if (options) {
        if (options.expires instanceof Date) {
          cookieStr += `; expires=${options.expires.toUTCString()}`;
        } else if (typeof options.expires === 'number') {
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + options.expires * 1000);
          cookieStr += `; expires=${expirationDate.toUTCString()}`;
        }

        if (options.path) {
          cookieStr += `; path=${options.path}`;
        }

        if (options.onlyHttp) {
          cookieStr += `; HttpOnly`;
        }
      }

      document.cookie = cookieStr;
    },
    get(name: string): string | undefined {
      const decodedName = encodeURIComponent(name);
      const cookies = document.cookie.split(';').map(cookie => cookie.trim());

      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === decodedName) {
          return decodeURIComponent(cookieValue);
        }
      }

      return undefined;
    },
    has(name: string): boolean {
      return this.get(name) !== undefined;
    },
    delete(name: string): boolean {
      if (this.has(name)) {
        this.set(name, '', { expires: new Date(0) });
        return true;
      }

      return false;
    },
    pop(name: string): string | undefined {
      const value = this.get(name);
      if (value) {
        this.delete(name);
        return value;
      }

      return undefined;
    },
  }
}
