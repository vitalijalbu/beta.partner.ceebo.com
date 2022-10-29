import { Preferences } from '@capacitor/preferences';

export const arrayReRange = (arr, oldIndex, newIndex) => {
  const data = [...arr];
  const [removed] = data.splice(oldIndex, 1);
  data.splice(newIndex, 0, removed);
  return data;
};

export const isObject = (val) => {
  return Object.prototype.toString.call(val) === '[object Object]';
};

export const generateUUID = async () => {
  const userData = await Preferences.get({ key: "session_guid" });

  
  const hex = "0123456789ABCDEF";
  const model = "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx";
  var str = "";
  for (var i = 0; i < model.length; i++) {
    var rnd = Math.floor(Math.random() * hex.length);
    str += model[i] == "x" ?  hex[rnd] : model[i] ;
  }
  if (userData && userData?.value?.length > 0) {
    //console.log('exists')
  }else{
    console.log('not exists')
      // Set localstorage
      await Preferences.set({
        key: "session_guid",
        value: str.toLowerCase()
      })
  }
}

