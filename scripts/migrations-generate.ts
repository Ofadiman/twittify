import { pascalCase } from 'change-case'
import execa from 'execa'
import yargs from 'yargs'

import { NodeEnv } from '../src/common/enums/node-env.enum'
import { EnvironmentVariables } from '../src/configuration/enums/environment-variables.enum'

// eslint-disable-next-line @typescript-eslint/typedef
const { name } = yargs(process.argv.slice(2))
  .options({
    name: {
      demandOption: true,
      description: `Kebab cased string used as the migration name.`,
      type: `string`
    }
  })
  .parseSync()

/**
 * Generating migrations from typeorm schema changes should always happens on the development environment.
 */
process.env[EnvironmentVariables.NodeEnv] = NodeEnv.Development

const pascalCaseName: string = pascalCase(name)
execa.commandSync(
  `yarn ts-node --require tsconfig-paths/register node_modules/typeorm/cli.js migration:generate -n ${pascalCaseName} --pretty`
)
