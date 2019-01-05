	// Make sure we wait to attach our handlers until the DOM is fully loaded.
    $(function() {
        $(".devouredBtn").on("click", function(event) { //When the devoured button is clicked
          var id = $(this).data("id");
          //var newSleep = $(this).data("newsleep");
      
          var newDevouredState = {
            devoured: true
          };
      
          // Send the PUT request.
          $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
          }).then(
            function() {
              console.log("changed devoured to", newDevouredState);
              // Reload the page to get the updated list
              location.reload(); //Not sure if I have to do this...
            }
          );
        });
      
        $(".create-form").on("submit", function(event) {
          // Make sure to preventDefault on a submit event.
          event.preventDefault();
      
          var newBurger = {
            burger_name: $("#burger").val().trim(),
            devoured: 0
          };
          console.log(newBurger);
      
          // Send the POST request.
          $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
          }).then(
            function() {
              console.log("created new burger");
              // Reload the page to get the updated list
              location.reload();
            }
          );
        });
      });