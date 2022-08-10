# ProxyChunk
ProxyChunk is a web-based open proxy checker and aggregator app. This repository only contains client-side code, server-side code is available in a [separate repository](https://github.com/octoman90/proxychunk-api).

## Installation
### Prerequisites
-   Node >=v14.0
-   pnpm (or Yarn, npm, etc.)
-   Nginx

### Installation
1. Run `pnpm install` command.
2. Change configuration by editing the `.env` file.
3. Run `pnpm build` command.
4. Point Nginx to serve files from the `build` directory using this snippet:
```
server {
	listen 80;
	server_name local;

	# Change this to where you have the frontend build directory
	root /path/to/where/you/have/proxychunk-web/build;

	location / {
		index index.html;
		try_files $uri /index.html;
	}
}
```

## Running
1. Run Nginx.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
