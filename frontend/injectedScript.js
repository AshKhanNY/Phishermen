$.ajax({
    url: "http://127.0.0.1:5000/detect/",
    type: "POST",
    data: {
      "url" : webpage
    },
    success: function(resp){
      console.log(resp);
    },
    error: function(e, s, t) {
      console.log("ERROR OCCURRED");
      console.log(e);
      console.log(s);
      console.log(t);
    }
});