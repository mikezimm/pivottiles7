import * as React from 'react';
import styles from '../Pivottiles7.module.scss';
import { IPivottiles7Props } from './IPivottiles7Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Pivottiles7 extends React.Component<IPivottiles7Props, {}> {
  public render(): React.ReactElement<IPivottiles7Props> {
    return (
      <div className={ styles.pivottiles7 }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
