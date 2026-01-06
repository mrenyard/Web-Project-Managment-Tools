# Web Project Management Tools.
## Utilities to manage the creation and management of web projects.
### webproject - Create and Manage Web Project Skeletons and Virtualhosts.
```
Usage: webproject "PROJECT_NAME" new|extend|update|reset   
[[ --domain DOMAIN][ --application][ --copy COPY_DOMAIN]]
```
| **PROJECT_NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | ***Name of required or 'new' project*** |
| :-----------------------| :--------------------------------------------------------------- |
| **new**                 | ***Generate base project skeleton*** (If no domain given infer sub-domain from PROJECT_NAME)|
| --domain&nbsp;DOMAIN    | Use provided domain name for server setup on this project.       |
| --application           | Include web application skeleton under project directory.        |
| --copy&nbsp;COPY_DOMAIN | Include static copy of current website under project directory.  |
| **extend**              | ***Extend relevant feature(s) if NOT already in use***           |
| --domain&nbsp;DOMAIN    | Add provided domain name as an alias on this existing project.   |
| --application           | Add web application skeleton under this project directory.       |
| --copy&nbsp;COPY_DOMAIN | Add static copy of current live site to this project.            |
| **update**              | ***Update relevant feature(s)*** (DOES NOT affect developer added files)|
| --domain&nbsp;DOMAIN    | Change primary domain name for this project.                     |
| --application           | Update web application skeleton. Overwrites old with new. DOES NOT affect developer added files.|
| --copy&nbsp;COPY_DOMAIN | Update/reset static copy of current site. OVERWRITES old.        |
| **reset**               | ***Reset relevant feature(s)***                                  |
| --domain&nbsp;DOMAIN    | Reset primary domain name for this project DELETING all aliases. |
| --application           | Reset web application skeleton under project directory. REMOVES any developer added files.|
| --copy&nbsp;COPY_DOMAIN | Reset/update static copy of current site. OVERWRITES old.        |
### virtualhost - Add or Remove Virtual Hosting of Web Project.
```
Usage: virtualhost "PROJECT_NAME" remove|[add DOMAIN[ --from-manifest]]
```
| **PROJECT_NAME**        | ***Name of target project***                                                   |
| :-----------------------| :----------------------------------------------------------------------------- |
| **remove**              | ***Remove virtual hosting for provided project***                              |
| **add**                 | ***Add virtual hosting for provided project with associated sub-/domain***     |
| DOMAIN                  | Sub-/domain to be used when adding new virtual host.                           |
| --from-manifest         | Switch indicating NO changes to .manifest during addition of existing project. |
### virtualhosts-from-manifest - Add all virtual hosts logged in Project directory .manifest
```
Usage: virtualhosts-from-manifest
```
### virtualhost-edit - Set or Change Virtualhost ServerName (domain).
```
Usage: virtualhost-edit HOST NEW_DOMAIN
```
| **HOST**                | ***Virtualhost filename to be modified***                       |
| :-----------------------| :-------------------------------------------------------------- |
| **NEW_DOMAIN**          | ***Domain to be changed or set as ServerName.***                |
### virtualhost-get-domain - Get Domain (ServerName) from VIRTUAL_HOST_FILE. 
```
Usage: virtualhost-get-domain HOST
```
| **HOST**                | ***Virtualhost filename to get domain (ServerName) from.***     |
| :-----------------------| :-------------------------------------------------------------- |
### copy-current-website - Make Copy existing Site Under 'copy' sub-domain. 
```
Usage: copy-current-website "PROJECT_NAME" COPY_DOMAIN
```
| **PROJECT_NAME**        | ***Name of target project to make a static copy of current website under.*** |
| :-----------------------| :--------------------------------------------------------------------------- |
| **COPY_DOMAIN**         | ***Domain of of current website to make a static copy of.***                 |
### virtualhost-append-copy - Add virtualhost sub-domain 'copy.'.
```
Usage: virtualhost-append-copy HOST
```
| **HOST**                | ***Virtualhost filename to append 'copy' sub-domain on.***      |
| :-----------------------| :-------------------------------------------------------------- |
### get-full-domain - Checks local subdomain structure to determine full domain.
```
Usage: get-full-domain DOMAIN
```
| **DOMAIN**              | ***Sub-/domain to be modified and or qualified as FULL_DOMAIN.*** |
| :-----------------------| :---------------------------------------------------------------- |
## Dependency Tree
```
webproject: "PROJECT_NAME" ...
    webproject-usage:
    virtualhost: "PROJECT_NAME" add DOMAIN | HOST remove
        get-full-domain: DOMAIN
        virtualhost-edit: HOST NEW_DOMAIN
            virtualhost-get-domain: HOST
        virtualhost-get-domain: HOST
    copy-current-website: "PROJECT_NAME" COPY_DOMAIN
        virtualhost-get-domain: HOST
        virtualhost-append-copy: HOST
            virtualhost-get-domain: HOST
    get-full-domain: DOMAIN

virtualhosts-from-manifest:
    virtualhost: "PROJECT_NAME" add DOMAIN | HOST remove
        get-full-domain: DOMAIN
        virtualhost-edit: HOST NEW_DOMAIN
            virtualhost-get-domain: HOST
        virtualhost-get-domain: HOST
```
## Initialisation and Installation Script

Copy the below into a file on your Debian based Linux Server (init.sh):

```console
#!/bin/bash -eu

if [[ $EUID -ne 0 ]]; then echo "This script must be run as root" 1>&2; exit 1; fi
if [ $USER == 'root' ]; then USER=$SUDO_USER; HOME="/home/${SUDO_USER}"; fi
while [[ "${HOME}" == "/root" || ! -d "${HOME}" ]]; do
  echo "USER HOME PATH ${HOME} IS INVALID!";
  read -p "Enter username: " USER
  HOME=`echo "/home/${USER}"`;
done
LAN=false; LAN_HOSTNAME="${HOSTNAME,,}.lan"; if [[ "${HOSTNAME}" == *.lan ]]; then LAN=true; LAN_HOSTNAME=${HOSTNAME}; fi

sudo apt install curl

buildWebprojectTools () {
	echo -e "\nINSTALLing Web Project Management Tools for WebShop...";
	sudo apt install httrack mmv -y;
	VERSION=`curl -sk --head https://github.com/mrenyard/Web-Project-Managment-Tools/releases/latest/ | grep -o "location: https://github.com/mrenyard/Web-Project-Managment-Tools/releases/tag/v.*" | cut -d"v" -f2- | tr -d "\r"`;
	wget https://github.com/mrenyard/Web-Project-Managment-Tools/releases/download/v${VERSION}/webproject-tools_${VERSION}-0_all.deb;
	sudo chmod 644 webproject-tools_${VERSION}-0_all.deb;
	sudo chown ${USER}:${USER} webproject-tools_${VERSION}-0_all.deb;
	sudo dpkg -i webproject-tools_${VERSION}-0_all.deb;
	sudo rm webproject-tools_${VERSION}-0_all.deb;
	echo "  Web Project Management Tools for WebShop INSTALLED...";
}

if test -x "$(which webstart)" && curl -sk --head https://misc.${LAN_HOSTNAME}/info.php | head -n 1 | grep "HTTP/1.[01] 200." > /dev/null; then
  buildWebprojectTools;
else
  echo "Web Project Management Tools require Apache2 WebShop Configuration (LAMP)...";
  echo -e "\nINSTALLing Apache2 WebShop Configuration (LAMP)...";
  sudo apt update;
  sudo apt install openssl postfix apache2 -y;
  sudo ufw allow "Apache Full";
  sudo ufw enable;
  sudo apt install mysql-server -y;
  sudo apt install php libapache2-mod-php php-mysql php-xdebug -y;
  VERSION=`curl -sk --head https://github.com/mrenyard/Apache2-WebShop-Configuration/releases/latest/ | grep -o "location: https://github.com/mrenyard/Apache2-WebShop-Configuration/releases/tag/v.*" | cut -d"v" -f2- | tr -d "\r"`;
  wget https://github.com/mrenyard/Apache2-WebShop-Configuration/releases/download/v${VERSION}/apache2-webshop-conf_${VERSION}-0_all.deb
  sudo chmod 644 apache2-webshop-conf_${VERSION}-0_all.deb;
  sudo chown ${USER}:${USER} apache2-webshop-conf_${VERSION}-0_all.deb;
  sudo dpkg -i apache2-webshop-conf_${VERSION}-0_all.deb;
  if [ -d /etc/apache2/ssl ]; then sudo rm -rf /etc/apache2/ssl; fi;
  sudo mkdir /etc/apache2/ssl;
  echo "CREATING SELF-SIGNED SSL CERTIFICATE; USE ${HOSTNAME}.lan as FDQN";
  sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/apache2/ssl/apache.key -out /etc/apache2/ssl/apache.crt;
  sudo chown root:ssl-cert /etc/apache2/ssl/*;
  sudo chmod 710 /etc/apache2/ssl/*;
  sudo systemctl start apache2.service;
  sudo systemctl start mysql.service;
  sudo systemctl start postfix.service;
  sudo rm apache2-webshop-conf_${VERSION}-0_all.deb;
  echo "  Apache2 WebShop Configuration (LAMP) INSTALLED...";
  buildWebprojectTools;
fi
exit 0;
```
Change permisions to make sure it is executable:
```console 
sudo chmod 775 init.sh
```
and RUN:
```console
sudo ./init.sh
```
