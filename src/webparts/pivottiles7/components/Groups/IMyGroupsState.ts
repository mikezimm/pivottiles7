
import { Web, SiteGroups, SiteGroup, ISiteGroups, ISiteGroup, ISiteGroupInfo, IPrincipalInfo, PrincipalType, PrincipalSource } from "@pnp/sp/presets/all";

import { IUser } from '../IReUsableInterfaces';

import { IGroupsProps } from './IMyGroupsProps';


export const SiteAdminGroupName = 'SiteAdmins';
export const SiteAdminIconName = 'HeadsetSolid';

export const GuestsGroupName = 'Guests';
export const GuestsIconName = 'UserWarning';

// IMyGroups, ISingleGroup, IMyGroupsState
export interface ISingleGroup extends ISiteGroupInfo {

  users: IUser[];
  isLoading: boolean;
  uCount: number;
  AllowMembersEditMembership: boolean;
  IsHiddenInUI: boolean;
  RequestToJoinLeaveEmailSetting: string;
  AutoAcceptRequestToJoinLeave: boolean;
  Description: string;
  hasCurrentUser: boolean;
  groupProps: IGroupsProps;

}

export interface IMyGroups {

  groups:  ISingleGroup[];
  sortedGroups:  ISingleGroup[];
  sortedIds: number[];
  titles: string[];
  propTitles: string[];
  propProps: IGroupsProps[];
  Ids: number[];
  isLoading: boolean;
  counts: number[];
  userId: number;
  allUsers: IUser[];
  guestUsers: IUser[];
  groupsShowAdmins: boolean ;
  groupsShowGuests: boolean ;

}


export interface IMyGroupsState {
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
  indexSelectedKey: string;
  selectedGroupId: number;
  selectedGroup: ISingleGroup;
  searchString: string;
  searchText: string;
  myGroups: IMyGroups;

}
