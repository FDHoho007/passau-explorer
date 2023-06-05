# Passau Explorer
Überall in Passau sind kleine runde weiße NFC Tags versteckt, die als Abzeichen fungieren.
Das Ziel ist es diese zu finden. Über diese App wird getrackt, welche Abzeichen man bereits gesammelt hat.

## Behind the scenes
Im Hintergrund wird beim ersten Öffnen der App für jeden Nutzer ein ECDSA P-256 Schlüsselpaar erstellt.
Jedes Abzeichen verfügt ebenfalls über ein solches Schlüsselpaar und eine UUID. Diese können über https://badges.passau-explorer.fs-info.de/ abgerufen werden.
Öffentlich zugänglich sind dabei nur die Public Keys der Abezichen. Wird ein Abzeichen gefunden,
kann der dort hinterlegte Private Key verwendet werden, um den eigenen Public Key zu signieren.
Diese Signatur wird gespeichert, als Beweis, das Abzeichen eingesammelt zu haben. 
Über die UUID können Meta Daten abgerufen werden. Diese ist ebenfalls nur am Abezichen selbst zugänglich.

## Ideen für zukünfitige Features
* Scoreboard: GET/PUT die eigenen Signaturen auf einen zentralen Server. Dieser verarbeitet die Signaturen nach jedem Push und berechnet daraus das Scoreboard und Signaturanzahl jedes Nutzers.