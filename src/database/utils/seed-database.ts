import { NodeEnv } from '../../common/enums/node-env.enum'
import { EnvironmentVariables } from '../../configuration/enums/environment-variables.enum'

/**
 * Utility function responsible for running seed migrations. It ensures that migrations are not accidentally run on production.
 */
export const seedDatabase = async (migrationRunner: () => Promise<void>): Promise<void> => {
  const isProduction: boolean = process.env[EnvironmentVariables.NodeEnv] === NodeEnv.Production
  if (isProduction) {
    return
  }

  await migrationRunner()
}
