import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { IUserProperties } from "./IUserProperties";
import {
  PersonaSize,
} from 'office-ui-fabric-react';
export interface IPersonaCardProps {
  context: WebPartContext | ApplicationCustomizerContext;
  profileProperties: IUserProperties;
  //2020-11-24:  Added for adjusting card size
  size: PersonaSize;
  iconSize: number;
  iconTextSize: number;    
}
