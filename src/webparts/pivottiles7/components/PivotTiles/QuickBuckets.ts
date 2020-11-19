
import { IPivotTilesProps, ICustomCategories, ICustomLogic } from './IPivotTilesProps';

/**
 * 
 * @param date :  Format = new Date() or new Date(2015, 1, 21)
 */
export function getQuarter(date) 
  {
    var month = date.getMonth() + 1;
    return (Math.ceil(month / 3));
  }

/*
console.log(quarter_of_the_year(new Date()));
console.log(quarter_of_the_year(new Date(2015, 1, 21))); 
console.log(quarter_of_the_year(new Date(2015, 8, 18)));
*/

export type custTimeOption = 'modified' | 'created' | 'modified<' | 'created<' | 'modified>' | 'created>' ;

  export function CustTime( field : custTimeOption ) {
    let custCategories : ICustomCategories = null;
    let newField : any = field.replace('<','').replace('>','');

    if ( field.indexOf('>') === field.length -1 ) { 

        custCategories = CustTimeGL( newField, '>' ) ;
    }
    else if ( field.indexOf('<') === field.length -1 ) { 
        custCategories = CustTimeGL( newField, '<' ) ;
    }
    else {
        custCategories = CustTimeX( newField );
    }

    return custCategories;
  }


  export function CustTimeGL( field : custTimeOption , modifier: '>' | '<' ) {

    //Created and Modified should never have > sign since they are always in the past.
    
    let modOperator = modifier === '>' ? ' - ' : '';
    let modLabel = modifier === '>' ? ' - ' : '';
    let modLabelPastFuture = modifier === '>' ? 'Future' : 'Past';

    let logic : ICustomLogic[] = 
    [
        {
            "category":  modLabelPastFuture,
            "eval": "item." + field + "Time.cats.age[0] < " + modOperator + "0"
        },
      {
        "category": "<" + modOperator + "1Day",
        "eval": "item." + field + "Time.cats.age[0] < " + modOperator + "1"
      },
      {
        "category": "<" + modOperator + "1Wk",
        "eval": "item." + field + "Time.cats.age[0] < " + modOperator + "7"
      },
      {
        "category": "<" + modOperator + "1Mo",
        "eval": "item." + field + "Time.cats.age[0] < " + modOperator + "30.4"
      },
      {
        "category": "<" + modOperator + "3Mo",
        "eval": "item." + field + "Time.cats.age[0] < " + modOperator + "91"
      },
      {
        "category": "<" + modOperator + "1Yr",
        "eval": "item." + field + "Time.cats.age[0] < " + modOperator + "365"
      },
      //{
       // "category": ">1Yr in " + modLabelPastFuture,
       // "eval": "item." + field + "Time.cats.age[0] < " + modOperator + "1700"
      //}
    ];

    if ( modifier === '>' ) { logic.reverse(); }

    let allTabs = [];
    logic.map ( log => {
      if ( log.category.length > 0 ) { allTabs.push ( log.category + '' ); } 
    });

    let custCategories : ICustomCategories = {
      type: 'custom',
      column: '',
      logic: logic,
      allTabs: allTabs,
      break: true,
    };

    return custCategories;

  }

  export function CustTimeX( field : custTimeOption ) {

    let logic : ICustomLogic[] = 
    [
        {
            "category": "Past",
            "eval": "item." + field + "Time.cats.age[0] < 0"
        },
        {
            "category": "Today",
            "eval": "isSameTimeBucket(item." + field + "Time , startTime,'date')"
        },
        {
            "category": "This Wk",
            "eval": "isSameTimeBucket(item." + field + "Time , startTime,'week')"
        },
        {
            "category": "This Mo",
            "eval": "isSameTimeBucket(item." + field + "Time , startTime,'month')"
        },
        {
            "category": "This Q",
            "eval": "isSameTimeBucket(item." + field + "Time , startTime,'q')"
        },
        {
            "category": "This Yr",
            "eval": "isSameTimeBucket(item." + field + "Time , startTime,'year')"
        }
    ];


    let allTabs = [];
    logic.map ( log => {
      if ( log.category.length > 0 ) { allTabs.push ( log.category + '' ); } 
    });

    let custCategories : ICustomCategories = {
      type: 'custom',
      column: '',
      logic: logic,
      allTabs: allTabs,
      break: true,
    };

    return custCategories;

  }