# Web Project Management Tools.
## Utilities to manage the creation and management of web projects.
### webproject - Create and Manage Web Project Skeletons.
```
Usage: webproject PROJECT_NAME new|extend|update|reset   
[[ --domain DOMAIN][ --application APP_NAME][ --copy DOMAIN_TO_COPY]]
```
| PROJECT_NAME                  | Name of required or 'new' project.                                                                 |
| :---------------------------- | :------------------------------------------------------------------------------------------------- |
| **new**                       | ***Generate base project skeleton*** (If no domain given infer sub-domain from PROJECT_NAME)       |
| `-- domain DOMAIN`            | Use provided domain name for server setup on this project.                                         |
| `-- application APP_NAME`     | Include web application skeleton under project directory.                                          |
| `-- copy DOMAIN_TO_COPY`      | Include static copy of current website under project directory.                                    |
| **extend**                    | ***Extend relevant feature(s) if NOT already in use***                                             |
| `--domain DOMAIN`             | Add provided domain name as an alias on this existing project.                                     |
| `--application APP_NAME`      | Add web application skeleton under this project directory.                                         |
| `--copy DOMAIN_TO_COPY`       | Add static copy of current live site to this project.                                              |
| **update**                    | ***Update relevant feature(s). DOES NOT affect developer added files or existing base skeleton***  |
| `--domain DOMAIN`             | Change primary domain name for this project.                                                       |
| `--application APP_NAME`      | Update web application skeleton. Overwrites old with new. DOES NOT affect developer added files.   |
| `--copy DOMAIN_TO_COPY`       | Update/reset static copy of current site. OVERWRITES old.                                          |
| **reset**                     | ***Reset relevant feature(s)***                                                                    |
| `--domain DOMAIN`             | Reset primary domain name for this project DELETING all aliases.                                   |
| `--application APP_NAME`      | Reset web application skeleton under project directory. REMOVES any developer added files.         |
| `--copy DOMAIN_TO_COPY`       | Reset/update static copy of current site. OVERWRITES old.                                          |

 
## TODO
Setup local server for testing.
Write multiple test scenarios based on previous state:
 - ...
 - 
 - webproject Test1 new [new simple infer domain]
 - HOSTNAME=test-server.lan
 - webproject "Test Project Two" new --domain t2 [new sub-domain.${HOSTNAME}]
 - webproject "Test Project three" new --domain project.co.uk [new with full domain]
 - webproject "Test Project Two" remove [remove t2]
 - HOSTNAME=renyard.cloud
 - webproject "Test Project Four" new --domain t4 [new t4.renyard.cloud]
...
 
