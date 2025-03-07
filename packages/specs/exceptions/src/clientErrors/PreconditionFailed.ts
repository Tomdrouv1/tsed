import {ClientException} from "../core/ClientException.js";

export class PreconditionFailed extends ClientException {
  static readonly STATUS = 412;

  constructor(message: string, origin?: Error | string | any) {
    super(PreconditionFailed.STATUS, message, origin);
  }
}
