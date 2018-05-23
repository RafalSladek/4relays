# blynk app for control 4x power relays

### How to install all needed dependencies
```npm i```

### How to setup token (put this line into your .bashrc or other profile file depends on your shell)
```
export BLYNK_TOKEN=<YOUR_BLYNK_TOKEN_HERE>
```

### How to run manualy
```node index.js -t $BLYNK_TOKEN```

### How to install blynk app as a service
```
sudo copy blynkApp.service /etc/systemd/system/blynkApp.service
sudo systemctl daemon-reload
sleep 3
systemctl start blynkApp.service
systemctl enable blynkApp.service >/dev/null 2>&1
systemctl status blynkApp.service
```
