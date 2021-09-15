//obavjestenje za uspjesan unos novog korsinika 
$("#add_user").submit(function(event){
    alert("Data Inserted Succesfully");
})
//funckija za prikaz podataka iz baze u fronendu 
$("#update_user").submit(function(event){
   event.preventDefault(); 
   var unindexed_array=$(this).serializeArray();
   var data={}
   $.map(unindexed_array,function(n,i){
data[n['name']]=n['value']
   })
   console.log(data);
   
   var request={
 "url":`http://localhost:3000/api/myFirstDatabase/${data.id}`,

   "method":"PUT",
   "data":data
   }
   $.ajax(request).done(function(response){
   alert("Data Update successfull");

  
   })
})
//brisanje korisnika 
if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/myFirstDatabase/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this data")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                setInterval('location.reload()', 1000);
            })
        }
        
    })
}

//zabrana unosenja karaktera za datum
function isNumberKey(evt)
{
  var charCode = (evt.which) ? evt.which : event.keyCode;
 console.log(charCode);
    if (charCode != 46 && charCode != 45 && charCode > 31
    && (charCode < 48 || charCode > 57))
     return false;

  return true;
}


