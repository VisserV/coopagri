function afficheClt(){
     let externalevt = document.getElementById('external-events');
     console.log(externalevt);
     $.ajax({
         url:'./ressources/json/clients.json',
         dataType:'json',
         async : false,
         success : function(data){
              console.log(data);
              $.each(data, function(i, elt){
                    //let div = $('<div class="fc-event"> Commande n° '+ elt.id + '</div>');
                    let div = $('<div>');
                    div.attr('class', "fc-event");
                    div.text('Client '+ elt.raisonSociale);
                    $(externalevt).append(div)
              });
         },
     });

 };
 function affichefrs(){
      let externalevt = document.getElementById('external-events');
      console.log(externalevt);
      $.ajax({
          url:'./ressources/json/fournisseur.json',
          dataType:'json',
          async : false,
          success : function(data){
               console.log(data);
               $.each(data, function(i, elt){
                     //let div = $('<div class="fc-event"> Commande n° '+ elt.id + '</div>');
                     let div = $('<div>');
                     div.attr('class', "fc-event");
                     div.text('Fournisseur '+ elt.raisonSociale);
                     $(externalevt).append(div)
               });
          },
      });

  };

  function afficheLivr(){
       let externalevt = document.getElementById('external-events');
       console.log(externalevt);
       $.ajax({
           url:'./ressources/json/personnes.json',
           dataType:'json',
           async : false,
           success : function(data){
                console.log(data);
                $.each(data, function(i, elt){
                      //let div = $('<div class="fc-event"> Commande n° '+ elt.id + '</div>');
                  if (elt.prenom == 'Livreur 1' || elt.prenom == 'Livreur 2' ) {
                      let div = $('<div>');
                      div.text(elt.prenom);
                      $(externalevt).append(div)
                    }
                });
           },
       });

   };

 $(function() { // document ready

   afficheClt();
   affichefrs();
   /* initialize the external events
   -----------------------------------------------------------------*/

   $('#external-events .fc-event').each(function() {

     // store data so the calendar knows to render an event upon drop
     $(this).data('event', {
       title: $.trim($(this).text()), // use the element's text as the event title
       stick: true // maintain when user navigates (see docs on the renderEvent method)
     });

     // make the event draggable using jQuery UI
     $(this).draggable({
       zIndex: 999,
       revert: true,      // will cause the event to go back to its
       revertDuration: 0  //  original position after the drag
     });

   });

   /* initialize the calendar
   -----------------------------------------------------------------*/

   $('#calendar').fullCalendar({
     now: '2018-04-07',
     editable: true, // enable draggable events
     droppable: true, // this allows things to be dropped onto the calendar
     aspectRatio: 1.8,
     scrollTime: '00:00', // undo default 6am scrollTime
     header: {
       left: 'today prev,next',
       center: 'title',
       right: 'timelineDay,timelineThreeDays,agendaWeek,month'
     },
     defaultView: 'timelineDay',
     views: {
       timelineThreeDays: {
         type: 'timeline',
         duration: { days: 3 }
       }
     },
     resourceLabelText: 'Rooms',
     resources: [
       { id: 'a', title: 'Auditorium A' },
       { id: 'b', title: 'Auditorium B', eventColor: 'green' },
       { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
       { id: 'd', title: 'Auditorium D', children: [
         { id: 'd1', title: 'Room D1' },
         { id: 'd2', title: 'Room D2' }
       ] },
       { id: 'e', title: 'Auditorium E' },
       { id: 'f', title: 'Auditorium F', eventColor: 'red' },
       { id: 'g', title: 'Auditorium G' },
       { id: 'h', title: 'Auditorium H' },
       { id: 'i', title: 'Auditorium I' },
       { id: 'j', title: 'Auditorium J' },
       { id: 'k', title: 'Auditorium K' },
       { id: 'l', title: 'Auditorium L' },
       { id: 'm', title: 'Auditorium M' },
       { id: 'n', title: 'Auditorium N' },
       { id: 'o', title: 'Auditorium O' },
       { id: 'p', title: 'Auditorium P' },
       { id: 'q', title: 'Auditorium Q' },
       { id: 'r', title: 'Auditorium R' },
       { id: 's', title: 'Auditorium S' },
       { id: 't', title: 'Auditorium T' },
       { id: 'u', title: 'Auditorium U' },
       { id: 'v', title: 'Auditorium V' },
       { id: 'w', title: 'Auditorium W' },
       { id: 'x', title: 'Auditorium X' },
       { id: 'y', title: 'Auditorium Y' },
       { id: 'z', title: 'Auditorium Z' }
     ],
     drop: function(date, jsEvent, ui, resourceId) {
       console.log('drop', date.format(), resourceId);

       // is the "remove after drop" checkbox checked?
       if ($('#drop-remove').is(':checked')) {
         // if so, remove the element from the "Draggable Events" list
         $(this).remove();
       }
     },
     eventReceive: function(event) { // called when a proper external event is dropped
       console.log('eventReceive', event);
     },
     eventDrop: function(event) { // called when an event (already on the calendar) is moved
       console.log('eventDrop', event);
     }
   });

 });
