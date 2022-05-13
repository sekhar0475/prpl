import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lookupValue'
})
export class LookupValuePipe implements PipeTransform {

  transform(value, lookupVal, ...args: any[]) {
    let lookupObj;
    if(args && args.length > 0 && args[0]) {
      lookupObj = args[0].filter(obj => {
        return obj.id == value;
      }); 
    }
    
    if(lookupObj && lookupObj.length > 0 && lookupObj[0] !== undefined){
      return lookupObj[0][lookupVal];
    } else {
      return value;
    }
  }

}



//*+*_*+*+ How to use ********** {{item.serviceOfferingId | lookupValue : "serviceOffering" : referenceData.serviceOfferingList}} ********

// **** Variable Name **** : *** item.serviceOfferingId ***,

// ****Pipe name **** : *** lookupValue ***,

// ****Attribute name that have in lookup Array list **** : ***serviceOffering***

// ****List name where we compare**** : *** referenceData.serviceOfferingList***

