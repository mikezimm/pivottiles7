
import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, ISiteGroupInfo, IPrincipalInfo, PrincipalType, PrincipalSource } from "@pnp/sp/presets/all";

import { IUser } from '../IReUsableInterfaces';


// IMyGroups, ISingleGroup, IMyGroupsState
export interface ISingleGroup extends ISiteGroupInfo {

  users: IUser[];
  isLoading: boolean;
  uCount: number;
}

export interface IMyGroups {

  groups:  ISingleGroup[];
  titles: string[];
  propTitles: string[];
  Ids: number[];
  isLoading: boolean;
  counts: number[];

}


export interface IMyGroupsState {
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
  indexSelectedKey: string;
  searchString: string;
  searchText: string;
  myGroups: IMyGroups;


}
