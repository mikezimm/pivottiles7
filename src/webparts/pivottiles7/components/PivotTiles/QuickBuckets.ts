

/***
 *    d888888b .88b  d88. d8888b.  .d88b.  d8888b. d888888b      d8b   db d8888b. .88b  d88.      d88888b db    db d8b   db  .o88b. d888888b d888888b  .d88b.  d8b   db .d8888. 
 *      `88'   88'YbdP`88 88  `8D .8P  Y8. 88  `8D `~~88~~'      888o  88 88  `8D 88'YbdP`88      88'     88    88 888o  88 d8P  Y8 `~~88~~'   `88'   .8P  Y8. 888o  88 88'  YP 
 *       88    88  88  88 88oodD' 88    88 88oobY'    88         88V8o 88 88oodD' 88  88  88      88ooo   88    88 88V8o 88 8P         88       88    88    88 88V8o 88 `8bo.   
 *       88    88  88  88 88~~~   88    88 88`8b      88         88 V8o88 88~~~   88  88  88      88~~~   88    88 88 V8o88 8b         88       88    88    88 88 V8o88   `Y8b. 
 *      .88.   88  88  88 88      `8b  d8' 88 `88.    88         88  V888 88      88  88  88      88      88b  d88 88  V888 Y8b  d8    88      .88.   `8b  d8' 88  V888 db   8D 
 *    Y888888P YP  YP  YP 88       `Y88P'  88   YD    YP         VP   V8P 88      YP  YP  YP      YP      ~Y8888P' VP   V8P  `Y88P'    YP    Y888888P  `Y88P'  VP   V8P `8888Y' 
 *                                                                                                                                                                              
 *                                                                                                                                                                              
 */

//import { getQuarter } from '@mikezimm/npmfunctions/dist/dateServices';


import { IPivotTilesProps, ICustomCategories, ICustomLogic } from './IPivotTilesProps';

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