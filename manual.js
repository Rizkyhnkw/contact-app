// const renderhtml= (filepath, res) => {
//     fs.readFile(filepath, (err, data) => {
//         if (err) {
//             res.writeHead(404, {'Content-Type': 'text/plain'});
//             res.write('Error: file not found');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// }

// http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});

//     const url = req.url;
//     switch(url){
//         case '/about':
//             renderhtml('./about.html', res);
//             break;
//         case '.contact':
//         renderhtml('./contact.html', res)
//         default:
//             renderhtml('./index.html',res)

//     }

// if (url === '/about') {
//     renderhtml('./about.html', res); // Menambahkan parameter res
// } else if (url === '/contact') {
//     renderhtml('./contact.html', res)
// } else {
//     renderhtml('./index.html', res); // Menambahkan parameter res
// }
// }).listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });

