const {app, BrowserWindow} = require('electron')
const ProgressBar = require('electron-progressbar')
var path = require('path')

	// Keep a global reference of the window object, if you don't, the window will
  	// be closed automatically when the JavaScript object is garbage collected.
  	let window

	
	function createWindow() {
		
		// Create the browser window
		window = new BrowserWindow({width: 800, height: 600, icon: path.join(__dirname, 'assets/icons/png/app.png')})

		// and load the index.html
		window.loadFile('index.html')

		// open the DevTools
		// window.webContents.openDevTools()

		// Emitted when the window is closed.
		window.on('closed', () => {
			// Dereference the window object, usually you would store windows
      		        // in an array if your app supports multi windows, this is the time
		        // when you should delete the corresponding element.
                        window = null
		})
	}

	// This method will be called when Electron has finished
        // initialization and is ready to create browser windows.
        // Some APIs can only be used after this event occurs.
	app.on('ready', function() {
		var progressBar = new ProgressBar({
			indeterminate: false,
			text: 'Please wait while we are setting up things for you...',
			detail: 'Please wait...',
			browserWindow: {
				icon: path.join(__dirname, 'assets/icons/png/app.png')
			}
		});

		progressBar
			.on('completed', createWindow)
			.on('aborted', function(value) {
				console.info(`aborted... ${value}`);
			})
			.on('progress', function(value) {
				progressBar.detail = `Value ${value} out of ${progressBar.getOptions().maxValue}...`;
			});

		setInterval(function() {
			if (!progressBar.isCompleted()) {
				progressBar.value += 1; 
			}
		}, 100);
	});

	// Quit when all windows are closed.
	app.on('window-all-closed', () => {
		// On macOS it is common for applications and their menu bar
	        // to stay active until the user quits explicitly with Cmd + Q
		if (process.platform !== 'darwin') {
			app.quit()
		}
	})


	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
	        // dock icon is clicked and there are no other windows open.
		if (window === null) {
			createWindow()
		}
	})
