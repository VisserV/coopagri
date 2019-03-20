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
                    div.text('Client n°' + elt.id + ' : ' + elt.raisonSociale);
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
                     div.text('Fournisseur  n°' + elt.id + ' : ' + elt.raisonSociale);
                     $(externalevt).append(div)
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
     now: moment().add(1,'day'),
     editable: true, // enable draggable events
     droppable: true, // this allows things to be dropped onto the calendar
     aspectRatio: 1.8,
     eventOverlap: false,
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
     resourceLabelText: 'Livraison',
     resources: [
       { id:'a', title: 'Livreur 1'},
       { id:'b', title: 'Livreur 2'}
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
     },
     eventRender: function(event, element) {
        element.find(".fc-bg").css("pointer-events","none");
        element.append("<div style='position:absolute;bottom:0px;right:0px; z-index:10;'><button type='button' id='btnDeleteEvent' class='btn btn-block btn-primary btn-flat'>X</button></div>" );
        element.find("#btnDeleteEvent").click(function(){
             $('#calendar').fullCalendar('removeEvents',event._id);
        });}
   });

 });
