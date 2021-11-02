
/** Stub for address book */
export default function useItems(items) {

  let drips= [];
  let bundles= [];
  let heads= [];
  let chests= [];
  let waists= [];
  let hands= [];
  let underwares= [];
  let pants= [];
  let accessories= [];
  let foots = [];

  items && items.map(item => {
    if(item.type == "Drip"){      
      drips.push(item)      
    }else{
      let properties = item.properties;
      if(properties[0]){
        const slot = properties[0];
        console.log(slot.value.Text)
        switch(slot.value.Text){
          case "hand" : {
            
            hands.push(item);
            break;
          };
          case "chest" : {
           
            chests.push(item);
            break;
          };
          case "head" : {            
            heads.push(item);
            break;
          };
          case "waist" : {
            
            waists.push(item);
            break;
          };
          case "pants" : {
            
           pants.push(item);
           break;
          };
          case "underwear" : {
            
            underwares.push(item);
            break;
          };
          case "accessory" : {
            
            accessories.push(item);
            break;
          };
          case "foot" : {
            
            foots.push(item);
            break;
          };
        }
      }else{ //bundle
        
        bundles.push(item);
       
      }
    }
  })

  return { drips,bundles,heads,chests,waists,hands,underwares,pants,accessories,foots  };
}
