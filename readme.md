# wp-now-phpunit-example

Example of running PHPUnit with `wp-now`. See issue at [WordPress/wordpress-playground#1241](https://github.com/WordPress/wordpress-playground/issues/1241).

## Start

```sh
git clone https://github.com/eliot-akira/wp-now-phpunit-example
cd wp-now-phpunit-example
npm install
npm run start
```

It ends with a WASM error, "null function or function signature mismatch".

Compare with running from Composer-installed vendor folder:

```sh
npm run start:vendor
```

It ends with "Program terminated with exit(1)", which is the expected behavior because PHPUnit requires a test file.
