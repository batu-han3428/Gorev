export const getCookie = (filter = null) =>{
    var getCerezler = [];
    var cerezler = document.cookie.split(";");      

    for (var i = 0; i < cerezler.length; i++) { 
        var cerez = cerezler[i].split("="); 

        if(filter != null && filter == cerez[0].trim()) { 

            return {key:cerez[0],value:cerez[1]};
        }


        getCerezler.push({key:cerez[0],value:cerez[1]});
    }

    return getCerezler;
}