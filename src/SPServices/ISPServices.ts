//import { PeoplePickerEntity } from '@pnp/sp';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';

export interface ISPServices {

    searchUsers(searchString: string, searchFirstName: boolean);
    searchUsersNew(searchString: string, srchQry: string, isInitialSearch: boolean, pageNumber?: number);

}