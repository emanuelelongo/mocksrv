# mocksrv
For testing purpose, listen on a port and send fake output or errors with delay.

### Install
```bash
git clone https://github.com/lelettrone/mocksrv.git mocksrv
cd mocksrv
npm install
```

### Usage
```bash
cd mocksrv
node mocksrv [-p port] [-d delay] [-e errorCode] [[-o output] | [-of outputFile]]
```

#### Examples
You can try following examples pointing your browser to *http://localhost:8080/any/path?you=prefer*

```bash
//wait connection on 8080 port, send a 401 error after 10 seconds
node mocksrv -p 8080 -d 10000 -e 401
```

```bash
//wait connection on default 3000 port, send a "hello" response without delay
node mocksrv -o hello
```

```bash
//wait connection on 8080 port, send content of output.txt file as response after 100 ms
node mocksrv -p 8080  -of output.txt -d 100
```