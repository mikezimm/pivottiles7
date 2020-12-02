import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
export interface IMyGroupsProps {
  webURL: string;
  groups: any[];
  title: string;
  width: number;
  userId: number;
  displayMode: DisplayMode;
  context: WebPartContext;
  searchFirstName: boolean;
  setPivSize: PivotLinkSize;
  setPivFormat: PivotLinkFormat;
  updateProperty: (value: string) => void;
  searchProps?: string;
  clearTextSearchProps?: string;
  pageSize?: number;
}
