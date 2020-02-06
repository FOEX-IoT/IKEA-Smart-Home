const { IP, USER, KEY } = process.env;

export const host = IP + ":5684"
export const baseCommand = `coap-client -u "${USER}" -k "${KEY}"`;

export class Command {
  method: string;
  urlpaths: string[];
  url: string;

  constructor(method: string, urlpaths: string[], data: Object | undefined) {
    this.method = method;
    this.urlpaths = urlpaths;

    this.url = baseCommand + ` -m ${this.method}`;
    if (data) {
      this.url += ` -e '${JSON.stringify(data)}'`
    }

    this.url += ` "coaps://${IP}/${urlpaths.join("/")}"`
    console.log(this.url);
  }
}