/*
	 Global Variables:
	 updates
		An array of updates make by customers in the auction

	 cases
		An array of the name of the cases

	 updateStamp
		An array of times at the updates were made


	 Function List:
	 commitUpdate()
		Writes the array of updates to the textarea box, starting with the most recent
		bid first.

	 addBid()
		Adds a new bid to the array of updates, including the time and value of the bid

	 removeBid()
		Removes the latest bid from the top of the updates array stack

*/
		var updates = new Array();
		var cases = new Array();
		var updateStamp = new Array();

		function commitUpdate() {
		 var rtnUpdates = "";
		 for (var i = 0; i < updates.length; i++) {
			rtnUpdates += caseID + ": " + updateStamp[i] + " \n\t" + updates[i] + "\n";
		 }
		 document.timeTracker.timeList.value = rtnUpdates;
		 document.timeTracker.lastUpdate.value = updates[0];
		 document.timeTracker.caseID.value = "";
		 document.timeTracker.caseNotes.value = "";
		}

		function addUpdate() {
		 cases.unshift(document.timeTracker.caseID.value);
		 updates.unshift(document.timeTracker.bidAmount.value);

		 var stamp = new Date();
		 var hours = stamp.getHours();
		 var minutes = stamp.getMinutes();
		 var seconds = stamp.getSeconds();

		 minutes = minutes < 10 ? "0"+minutes : minutes;
		 seconds = seconds < 10 ? "0"+seconds : seconds;

		 var timeText = " "+hours+":"+minutes+":"+seconds+" ";

		 updateStamp.unshift(timeText);

		 commitUpdate();
		}

		function delUpdate() {
		 cases.shift();
		 updates.shift();
		 updateStamp.shift();
		 commitUpdate();
		}