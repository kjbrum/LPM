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

    // Setup the dropdown in the menubar
    var trayIcon = new Tray(__dirname + '/icon.png');
    var template = [
      {
        label: 'Electron',
        submenu: [
          {
            label: 'About Electron',
            selector: 'orderFrontStandardAboutPanel:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            label: 'Hide Electron',
            accelerator: 'Command+H',
            selector: 'hide:'
          },
          {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
          },
          {
            label: 'Show All',
            selector: 'unhideAllApplications:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() {
                app.quit();
            }
          },
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click: function() {
                BrowserWindow.getFocusedWindow().reloadIgnoringCache();
            }
          },
          {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click: function() {
                BrowserWindow.getFocusedWindow().toggleDevTools();
            }
          },
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
          },
          {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          },
        ]
      },
      {
        label: 'Help',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit LPM'
      },
    ];
    var menu = Menu.buildFromTemplate(template);
    trayIcon.setContextMenu(menu);
    app.dock.bounce();
    // app.dock.setMenu(menu);

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
