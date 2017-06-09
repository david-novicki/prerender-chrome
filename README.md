# prerender-chrome
Prerendering service with caching built around headless Chrome. This project was inspired by [prerender.io](https://github.com/prerender/prerender) and is at it's infancy. 

This service plugs in with existing module [prerender-node](https://www.npmjs.com/package/prerender-node) built by the by [prerender.io](https://github.com/prerender/prerender) team. I have not tested but it may plug in with their other framework modules.

## To get started
Required dependencies:
- Docker
- Redis
- NodeJS
```
docker pull justinribeiro/chrome-headless
docker run -d -p 9222:9222 --cap-add=SYS_ADMIN justinribeiro/chrome-headless
npm install
CACHE_INTERVAL=5 ALLOWED_DOMAINS=https://www.google.com npm start
```
### Environment variables
- CACHE_INTERVAL (in minutes, defaults to every 59 minutes)
- PORT (defaults to 3000)
- ALLOWED_DOMAINS (comma delimited string of allowed domains **MANDATORY**)

**THIS PROJECT DOES NOT WORK WITH LOCALHOST**

MIT License

Copyright (c) 2017 David Novicki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

