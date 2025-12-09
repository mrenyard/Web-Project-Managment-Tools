# Web Project Management Tools.
## Utilities to manage the creation and management of web projects.
### webproject - Create and Manage Web Project Skeletons and Virtualhosts.
```
Usage: webproject "PROJECT_NAME" new|extend|update|reset   
[[ --domain DOMAIN][ --application][ --copy COPY_DOMAIN]]
```
| **PROJECT_NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;** | **Name of required or 'new' project** |
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
| **HOST**                | Virtualhost filename to be modified                             |
| **NEW_DOMAIN**          | Domain to be changed or set as ServerName.                      |
### virtualhost-get-domain - Get Domain (ServerName) from VIRTUAL_HOST_FILE. 
```
Usage: virtualhost-get-domain HOST
```
| **HOST**                | Virtualhost filename to get domain (ServerName) from.           |
### copy-current-website - Make Copy existing Site Under 'copy' sub-domain. 
```
Usage: copy-current-website "PROJECT_NAME" COPY_DOMAIN
```
| **PROJECT_NAME**        | Name of target project to make a static copy of current website under. |
| **COPY_DOMAIN**         | Domain of of current website to make a static copy of.                 |
### virtualhost-append-copy - Add virtualhost sub-domain 'copy.'.
```
Usage: virtualhost-append-copy HOST
```
| **HOST**                | Virtualhost filename to append 'copy' sub-domain on.           |
### get-full-domain - Checks local subdomain structure to determine full domain.
```
Usage: get-full-domain DOMAIN
```
| **DOMAIN**              | Sub-/domain to be modified and or qualified as FULL_DOMAIN.    |
##Dependency Tree
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
## TODO
Setup local server for testing.
Write multiple test scenarios based on previous state:

- get-full-domain
- virtualhost-get-domain
- virtualhost-edit
- virtualhost TestVH1 add testvh1
- virtualhost TestVH1 remove
- virtualhosts-from-manifest
- virtualhost-edit (change domain) testvh1
- virtualhost-append-copy
- copy-current-website
- webproject testwp1 new (basic)
- webproject testwp2(t2) new (with all extras)
- webproject extend (with all extras)
- webproject update (change domain, update app skeleton & website copy)

