import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
export interface IMyGroupsProps {
  webURL: string;
  groups: any[];
  title: string;
  displayMode: DisplayMode;
  context: WebPartContext;
  searchFirstName: boolean;
  updateProperty: (value: string) => void;
  searchProps?: string;
  clearTextSearchProps?: string;
  pageSize?: number;
}
