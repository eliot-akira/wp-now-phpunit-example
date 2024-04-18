import path from 'path'
import { getWpNowConfig, startServer } from '@wp-now/wp-now'

async function main() {
  const args = process.argv.slice(2)
  const { php, options: wpNowOptions } = await startServer({
    ...await getWpNowConfig({
      path: process.cwd(),
    }),
    mode: 'playground',
    reset: true,
  })

  const scriptPath = import.meta.dirname

  php.mount(path.join(scriptPath), `/here`)

  try {
    await php.cli([
      '/here/vendor/bin/phpunit',
      ...args,
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