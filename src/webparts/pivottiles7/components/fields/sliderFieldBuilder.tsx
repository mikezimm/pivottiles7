

import * as React from 'react';

import { Slider, ISliderProps } from 'office-ui-fabric-react/lib/Slider';

export function createSlider(maxTime , timeSliderInc, timeSliderValue, _onChange){

  return (
    <div style={{minWidth: 400, }}>
      <Slider 
      label={ ((timeSliderValue < 0)  ? "Start time is in the past" : "End time is Back to the future" ) }
      min={ -1 * maxTime } 
      max={ maxTime } 
      step={ timeSliderInc } 
      defaultValue={ 0 } 
      valueFormat={value => `${value} mins`}
      showValue 
      originFromZero
      onChange={_onChange}
     />

    </div>

  );

}

/*
function _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
  console.dir(option);
}
*/