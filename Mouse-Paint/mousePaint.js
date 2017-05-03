//Declaring the three variable for width, color, and blur
    var newWidth = 0;
    var newColor = "#ffc600";
    var newBlur = 0;

    //Getting the status of the controls
    const inputs = document.querySelectorAll('.controls input');
    const erase = document.querySelector('#eraser');

    //function handling the assignment of new values to variables
    function handleUpdate() {

      if (this.id === "base") {
        newColor = this.value;
      } else if (this.id === "spacing") {
        newWidth = this.value;
      } else if (this.id === "blur") {
        newBlur = this.value;
      }

    }

    function handleErase() {
      newColor = '#FFFFFF';
      newBlur = 0;
      reset();
    }

    function reset() {
      document.getElementById('blur').value = 0;
      document.getElementById('spacing').value = 0;
    }

    //monitoring the controls for changes
    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
    erase.addEventListener('click', handleErase);



    //Setting up the canvas to enable drawing
    const canvas = document.querySelector('#draw');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.strokeStyle = newColor;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = 0;
    context.globalCompositeOperaton = "multiply";
    context.shadowColor = "#000";
    context.shadowBlur = newBlur;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;

    //this is the function that actually permits drawing
    function draw(e) {

      if (!isDrawing) return;
      // console.log(e);
      context.lineWidth = newWidth;
      context.strokeStyle = newColor;
      context.shadowBlur = newBlur;
      context.beginPath();
      context.moveTo(lastX, lastY); //starting form
      context.lineTo(e.offsetX, e.offsetY); //going to
      context.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
      hue++;
    }

    //listening for events that signal beginning of drawing
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];

    });
    //listening for events that signal ending of drawing
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);