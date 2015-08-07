/*
   Global Variables:
   bids
      An array of bids make by customers in the auction

   bidders
      An array of the name of the bidders

   bidTime
      An array of times at the bids were made


   Function List:
   writeBid()
      Writes the array of bids to the textarea box, starting with the most recent
      bid first.

   addBid()
      Adds a new bid to the array of bids, including the time and value of the bid

   removeBid()
      Removes the latest bid from the top of the bids array stack

*/
      var bids = new Array();
      var bidders = new Array();
      var bidTime = new Array();

      function writeBid() {
         var historyText="";
         for (var i = 0; i < bids.length; i++) {
            historyText += bidTime[i] + " " + bids[i] + "(" + bidders[i] + ") \n";
         }
         document.bidForm.bidList.value = historyText;
         document.bidForm.latestBid.value = bids[0];
         document.bidForm.bidId.value = "";
         document.bidForm.bidAmount.value = "";
      }

      function addBid() {
         bidders.unshift(document.bidForm.bidId.value);
         bids.unshift(document.bidForm.bidAmount.value);

         var now = new Date();
         var hours = now.getHours();
         var minutes = now.getMinutes();
         var seconds = now.getSeconds();

         // add leading zeros to minutes and seconds less than 10
         minutes = minutes < 10 ? "0"+minutes : minutes;
         seconds = seconds < 10 ? "0"+seconds : seconds;
         var timeText = "["+hours+":"+minutes+":"+seconds+"]";

         bidTime.unshift(timeText);

         writeBid();
      }

      function removeBid() {
         bidders.shift();
         bids.shift();
         bidTime.shift();
         writeBid();
      }