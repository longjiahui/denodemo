import { program } from './deps.ts'

program.command('hello').action(() => console.debug('hello world'))

program.parse(Deno.args)
