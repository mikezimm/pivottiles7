# pivottiles-7

### Additional npm installs
```
npm install @pnp/logging @pnp/common @pnp/odata @pnp/sp --save
npm install @pnp/sp
npm install @pnp/spfx-controls-react --save --save-exact
npm install react-slick
npm install webpack-bundle-analyzer --save-dev

npm install @pnp/graph
npm install react-js-pagination
npm install throttle-debounce
```

## Summary

Short summary on functionality and used technologies.

[picture of the solution in action, if possible]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.11-green.svg)

## Solution

Solution|Author(s)
--------|---------
Pivottiles7 | Mike Zimmerman

## Version history

Version|Date|Comments
-------|----|--------
1.1|March 10, 2021|Update comment
1.0|January 29, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features
# Configuration and Setup
## List based analytics
1. update strings in en-us.js for your analytics web and list.
*    **analyticsList**: "TilesCycleTesting",
*    **analyticsWeb**: "https://mcclickster.sharepoint.com/sites/Templates/SiteAudit/",
2. update analytics save details in /src/services/createAnalytics.ts
    refer to: export function saveAnalytics
    update variables and static column names in your list to save information you want
    insure that "Everyone" can at least create items on your analytics list

## Pre-configured options
The web part has 3 built in configurations defined in the manifest.json file.
1. DEV - Developer web part which includes all CORP and TEAM definitions plus custom/test definitions.
2. CORP - Corporate standard tile definitions refering to corporate portals.
* Intended to have web part option that can make it easy to display slices of standard corporate libraries.
3. TEAM - Intended more for Team site with total customization features

* **AvailableListMapping.ts** contains all the list defintion choices and definitions for the webpart.
* **DevListMapping.ts** contains the list defintions used in the DEV Scenario. - pulls from AvailableListMapping.ts.
* **CorpListMapping.ts** contains all list defintions used in the CORP Scenario. - pulls from AvailableListMapping.ts.
* **TeamListMapping.ts** contains all list defintions used in the TEAM Scenario. - pulls from AvailableListMapping.ts.
* Make sure Corp and Team mappings have same spelling for the listChoice keys that are used in AvailableListMapping.ts.

* uses **scenario** prop in pre-configured properties to determine prop pane dropdown for list definition.
* eventually you could use the **secnario** prop to limit access to other parts of the property pane.
* possibly even limit which tile list/library urls could be used with different configurations.

## End-user Short-cuts and features
* [x] CTRL-ALT-SHFT-Click a tile to edit it's properties
* [x] CTRL-CLick "Minimize ---" button to go to site contents
* [x] CTRL-Click Pivot to make that category the "Hero" category
* [x] ALT-SHFT-Click "Minimize ---" button to see analytics
* [x] ALT-Click "Search" to search All tiles (not just the ones currently filtered)



### ToDos:
- [ ] Add way to re-do categories to some basic options like Modified, Created dates/users.
- [ ] Add Age categories.
- [ ] Add prop pane prop to define format for dates for Tile Category and Title/Description.
- [ ] Special Click to go into list mode, maybe one that toggles back and icon changes from list to grid.
- [ ] Finalize ShowAll items icon... currently filter-x, maybe make it a pivot choice?
- [ ] webPartProperty to pick Search Capability:  Dropdown - Visible, Collapsed, None (disabled)
- [ ] Check DocumentCard Text below image is Hero Category, not description.
- [ ] Add **maxDynamicSearchQty** property so that search only happens upon Enter when exceeding that quantity
- [ ] Add webPartProperty to **enableSearch**
- [ ] Create alternate **Hover** styles besides slide up panel - like fadding or white overlay and black text
- [ ] Add Hero Aspect Ratio to all Hero Types
- [ ] Improve **Help** panel layout/look/feel
- [ ] **CTRL-ALT-SHFT-Click** on Icons does not go to correct Url:  /sites/Templates/Icons/sites/Forms/DispForm.aspx
       * This seems to be because Site and Library are the same **Icons**
       * This also impacts the **Links in help panel** (only on this list)
- [ ] Add image **cover/fit** options to **DocumentCard** layout (Icons are very big and not correct aspect ratio)
- [ ] Add image **cover/fit/size** options in **Carousel**.   9/16 can sometimes just be to wide and tall on full page
- [ ] Improve **onHover** on **DocumentCard** layout
- [ ] Add ShowAll button
- [ ] What to do about Hero Carousel during search?



- [x] Fix when Category columns are number arrays (like Author/ID):  done - PivotTiles\utils.ts: convertValues
- [x] Fix TestImages listDefinition with multiple **Others** categories. done - PivotTiles\utils.ts: buildTileCategoriesFromResponse
- [x] Add way to convert dates in Tile Category to Year or Month.





## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
