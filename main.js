var app = require('app');  // Module to control application life.
var Menu = require('menu');
var Tray = require('tray');
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var fs = require('fs');
var _ = require('lodash');

// Report crashes to our server.
require('crash-reporter').start();

// Global reference of the window object
var win = null;

// Quit when all windows are closed
app.on('window-all-closed', function() {
    app.quit();
});

// Initialization completed
app.on('ready', function() {

    var appIcon = new Tray(__dirname + '/icon.png');
    var contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' },
    ]);
    appIcon.setToolTip('This is my application.');
    appIcon.setContextMenu(contextMenu);

    // Create the browser window
    win = new BrowserWindow({
        width: 800,
        height: 1000,
        resizable: false,
        center: true
    });

    // Load the html file
    win.loadUrl('file://' + __dirname + '/index.html');

    win.webContents.on('did-finish-load', function() {
        var html = '';
        fs.readdir('/www/sites', function(err, files) {
            html += '<ul>';

            // Loop through the projects
            _(files).forEach(function(i) {
                html += '<li><a href="#" data-path="'+i+'">'+i+'</a><li>';
            }).value();

            html += '</ul>';
            // document.getElementById('list').innerHTML = html;
            console.log(html);
        });
    });


    // Window has been closed
    win.on('closed', function() {
        // Dereference the window object
        win = null;
    });
});
