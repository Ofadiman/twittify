import { pascalCase } from 'change-case'
import execa from 'execa'
import yargs from 'yargs'

// eslint-disable-next-line @typescript-eslint/typedef
const { name } = yargs(process.argv.slice(2))
  .options({
    name: {
      demandOption: true,
      description: `Kebab case string used as the migration name.`,
      type: `string`
    }
  })
  .parseSync()

const pascalCaseName: string = pascalCase(name)
execa.commandSync(
  `yarn ts-node --require tsconfig-paths/register node_modules/typeorm/cli.js migration:create -n ${pascalCaseName}`
)
