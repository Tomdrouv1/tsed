import {injectable} from "../fn/injectable.js";
import type {ProviderOpts} from "../interfaces/ProviderOpts.js";

/**
 * The decorators `@Injectable()` declare a new service can be injected in other service, controller, interceptor, etc.. on there `constructor`.
 * All classes annotated with `@Injectable()` are built one time, excepted if you change the default provider configuration.
 *
 * ::: tip
 * `@Injectable()` use the `reflect-metadata` to collect and inject the built provided to other services.
 * :::
 *
 * ### Options
 *
 * - type (@@ProviderType@@  or `string`): Kind of provider. (Default: `ProviderType.PROVIDER`)
 * - scope (@@ProviderScope@@): Kind of provider. (Default: `ProviderScope.SINGLETON`)
 * - token (@@TokenProvider@@): An injection token (Note: This option override default metadata generated by Typescript).
 * - deps (`Type<any>`): List of class or provider which will be injected to the constructor (Note: This options override default metadata generated by Typescript).
 *
 * @returns {Function}
 * @decorator
 */
export function Injectable(options: Partial<ProviderOpts> = {}): ClassDecorator {
  return (target: any) => {
    const opts = {
      ...options,
      ...(options.token ? {useClass: target} : {token: target})
    };
    injectable(opts.token, opts);
  };
}
