# Web Project Management Tools.
## Utilities to manage the creation and management of web projects.
### webproject - Create and Manage Web Project Skeletons and Virtualhosts.
```
Usage: webproject PROJECT_NAME new|extend|update|reset   
[[ --domain DOMAIN][ --application APP_NAME][ --copy DOMAIN_TO_COPY]]
```
| **PROJECT_NAME**              | ****Name of required or 'new' project****                                                          |
| :---------------------------- | :------------------------------------------------------------------------------------------------- |
| **new**                       | ***Generate base project skeleton*** (If no domain given infer sub-domain from PROJECT_NAME)       |
| -- domain&nbsp;DOMAIN         | Use provided domain name for server setup on this project.                                         |
| -- application&nbsp;APP_NAME  | Include web application skeleton under project directory.                                          |
| -- copy&nbsp;DOMAIN_TO_COPY   | Include static copy of current website under project directory.                                    |
| **extend**                    | ***Extend relevant feature(s) if NOT already in use***                                             |
| --domain&nbsp;DOMAIN          | Add provided domain name as an alias on this existing project.                                     |
| --application&nbsp;APP_NAME   | Add web application skeleton under this project directory.                                         |
| --copy&nbsp;DOMAIN_TO_COPY    | Add static copy of current live site to this project.                                              |
| **update**                    | ***Update relevant feature(s)*** (DOES NOT affect developer added files or existing base skeleton) |
| --domain&nbsp;DOMAIN          | Change primary domain name for this project.                                                       |
| --application&nbsp;APP_NAME   | Update web application skeleton. Overwrites old with new. DOES NOT affect developer added files.   |
| --copy&nbsp;DOMAIN_TO_COPY    | Update/reset static copy of current site. OVERWRITES old.                                          |
| **reset**                     | ***Reset relevant feature(s)***                                                                    |
| --domain&nbsp;DOMAIN          | Reset primary domain name for this project DELETING all aliases.                                   |
| --application&nbsp;APP_NAME   | Reset web application skeleton under project directory. REMOVES any developer added files.         |
| --copy&nbsp;DOMAIN_TO_COPY    | Reset/update static copy of current site. OVERWRITES old.                                          |
### virtualhost - Add or Remove Virtual Hosting of Web Project.
```
Usage: virtualhost PROJECT_NAME remove|[add DOMAIN[ --from-manifest]]
```
| **PROJECT_NAME**              | ****Name of target project****                                                 |
| :---------------------------- | :----------------------------------------------------------------------------- |
| **remove**                    | ***Remove virtual hosting for provided project***                              |
| **add**                       | ***Add virtual hosting for provided project with associated sub-/domain***     |
| DOMAIN                        | Sub-/domain to be used when adding new virtual host.                           |
| --from-manifest               | Switch indicating NO changes to .manifest during addition of existing project. |
### virtualhost-edit - Set or Change Virtualhost ServerName.
```
Usage: virtualhost-edit VIRTUAL_HOST_FILE NEW_DOMAIN
```
### virtualhost-get-domain - Get Domain (ServerName) from VIRTUAL_HOST_FILE. 
```
Usage: virtualhost-get-domain VIRTUAL_HOST_FILE
```
### copy-current-website - Make Copy existing Site Under 'copy' sub-domain  
```
Usage: copy-current-website PROJECT_NAME DOMAIN_TO_COPY
```
### virtualhost-append-copy - Add virtualhost sub-domain 'copy.' 
```
Usage: virtualhost-append-copy VIRTUAL_HOST_FILE
```
### virtualhosts-from-manifest
```
Usage: virtualhost-from-manifest
```

REQUIERS
--------
webproject:
    webproject-usage
    virtualhost:
        virtualhost-edit
            virtualhost-get-domain
        virtualhost-get-domain
    copy-current-website
        virtualhost-get-domain
        virtualhost-append-copy
            virtualhost-get-domain

virtualhosts-from-manifest
    virtualhost
        virtualhost-edit
            virtualhost-get-domain
        virtualhost-get-domain

## TODO
Setup local server for testing.
Write multiple test scenarios based on previous state:
- virtualhost-get-domain
- virtualhost-edit
- virtualhost TestVH1 add testvh1
- virtualhost TestVH1 remove
- virtualhosts-from-manifest

- virtualhost-append-copy
- copy-current-website
- ...
- 
- HOSTNAME=test-server.lan
 - ...
 - webproject Test1 new [new simple infer domain]
 - 
 - webproject "Test Project Two" new --domain test2 [new sub-domain.${HOSTNAME}]
 - webproject "Test Project three" new --domain project.co.uk [new with full domain]
 - webproject "Test Project Two" remove [remove t2]
 - HOSTNAME=renyard.cloud
 - webproject "Test Project Four" new --domain t4 [new t4.renyard.cloud]
...
 
