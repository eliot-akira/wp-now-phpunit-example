import path from 'path'
import { getWpNowConfig, startServer } from '@wp-now/wp-now'

async function main() {

  const { php, options: wpNowOptions } = await startServer({
    ...await getWpNowConfig({
      path: process.cwd(),
    }),
    mode: 'playground'
  })

  const scriptPath = import.meta.dirname

  php.mount(path.join(scriptPath, 'phpunit'), `/phpunit`)

  try {
    await php.cli([
      'php',
      `/phpunit/phpunit-9.6.17.phar`,
      `--path=${wpNowOptions.documentRoot}`,
    ])
  } catch (resultOrError) {
    const success =
      resultOrError.name === 'ExitStatus' && resultOrError.status === 0
    if (!success) {
      console.log('PHP CLI error', resultOrError)
    }
  }

  process.exit()
}

main().catch(console.error)