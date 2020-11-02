  let count = 0;

  window.onload = function() {

    // number of loops
    const LOOP = "50000000";

    // worker code
    const workerCode = `
      self.addEventListener('message', function(msg) {
        let n = parseInt(msg.data);
        for (let i = 0; i < n; i++);
        self.postMessage("loop finish: " + n);
      }, false);
    `;

    const blob = new Blob([workerCode]);
    const blobURL = URL.createObjectURL(blob);

    let workers = document.getElementById("workers_run");
    let noWorkers = document.getElementById("no_workers_run");
    let clear = document.getElementById("clear");
    let output = document.getElementById("output");

    countTimer();

    // create Worker object
    let workerObj = new Worker(blobURL);


    // send a message to worker
    workers.onclick = function() {
      console.log("send messsage")
      workerObj.postMessage(LOOP);
    };

      // receive message from worker
      workerObj.onmessage = function(e) {
        console.log("receive message")
        output.innerHTML =  e.data;
      }

      // run directly instead of worker
      noWorkers.onclick = function() {
        for (let i = 0; i < LOOP; i++);
        output.innerHTML =  "loop finish: " + LOOP;
      };

      // clear the execution result
      clear.onclick = function() {
          output.innerHTML = "";
      };
  };

  function countTimer() {
    let counter = document.getElementById("counter");
    setInterval(function() {
      count++;
      counter.innerHTML = "count: " + count;
    }, 100);
  }
