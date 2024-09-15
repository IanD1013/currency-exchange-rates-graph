/**
 * This class handles data visualization
 */
export class Graph {
  constructor() {
    this.canvas = document.getElementById("graph");
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.rect = this.canvas.getBoundingClientRect();
    this.ctx = this.canvas.getContext("2d");

    // Values used for rendering positions
    this.padding = 50;
    this.stepX = 0; // unit is pixels

    // Values used to store received data
    // because we will use them later for redrawing canvas
    this.labels = null;
    this.data = null;
    this.currency = null;

    // Limit of lables to show
    this.labelCount = 6;

    // Used to check, if we need to show
    // specific currency data in the graph
    this.showExtraData = false;

    // Subscribing to resize event, so we could
    // redraw entire graph when screen size changes
    window.onresize = () => {
      // Check if data exists
      if (this.data != null && this.labels != null) {
        // Assign new width and height values
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;

        // Change limit, because labels
        // start to collapse on each other
        if (this.canvas.width < 550) {
          this.labelCount = 3;
        } else {
          this.labelCount = 6;
        }

        // Assign new rect
        this.rect = this.canvas.getBoundingClientRect();

        // Redraw everything
        this.drawClient(this.data, this.labels, this.currency);
      }
    };

    // Subscribing to mouseenter event
    // to let canvas know, when to show extra data
    this.canvas.addEventListener("mouseenter", () => {
      this.showExtraData = true;
    });

    // Subscribing to mouseleave event
    // to let canvas know, when to stop showing extra data
    this.canvas.addEventListener("mouseleave", () => {
      this.showExtraData = false;
      // Redraw
      this.drawClient(this.data, this.labels, this.currency);
    });

    // Show extra data for each new position
    this.canvas.addEventListener("mousemove", (e) => this.showData(e));
  }

  /**
   * Shows extra data, when mouse is hovering over
   * one of the rendered data points
   */
  showData(e) {
    // e is mousemove event
    if (this.showExtraData) {
      let x = e.clientX - this.padding - this.rect.left; // exact x position of the mouse
      let y = this.canvas.height - this.padding;

      let dataIndex = Math.round(x / this.stepX);

      if (dataIndex >= 0 && dataIndex < this.data.length) {
        this.drawClient(this.data, this.labels, this.currency);

        let x = dataIndex * this.stepX + this.padding; // x position of the data point nearest to the mouse

        this.drawLine(x, this.padding, x, y, "black");
        this.drawText(x, 0, 100, 50, `${this.data[dataIndex]} ${this.currency}`, new Date(this.labels[dataIndex]).toUTCString(), "white");
      }
    }
  }

  drawLine(x1, y1, x2, y2, color) {
    this.ctx.beginPath();

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);

    this.ctx.strokeStyle = color;
    this.ctx.stroke();
  }

  drawText(x, y, width, height, text, dateText, color) {
    let metrics = this.ctx.measureText(dateText);

    // Recalculate position if current dateText
    // goes out of bounds
    if (metrics.width + x >= this.canvas.width) {
      x = this.canvas.width - metrics.width;
    }

    this.ctx.fillStyle = "black";
    this.ctx.fillText(text, x, height - 30);
    this.ctx.fillText(dateText, x, height - 10);
  }

  ///////////////////////////////////////////////////////
  drawClient(data, labels, currency) {
    // Saving given values
    this.data = data;
    this.labels = labels;
    this.currency = currency;

    // Drawing background
    this.fillRect({ x: 0, y: 0, w: this.canvas.width, h: this.canvas.height }, "white");

    // Apply padding to all values
    let startX = this.padding;
    let startY = this.padding;
    let graphWidth = this.canvas.width - this.padding * 2;
    let graphHeight = this.canvas.height - this.padding * 2;

    // Find grid increment values
    this.stepX = Math.round(graphWidth / (labels.length - 1));
    let stepY = graphHeight / 4;

    // Can not be less than one pixel
    if (this.stepX < 1) {
      this.stepX = 1;
    }

    let maxY = Math.max(...this.data);
    let minY = Math.min(...this.data);

    let diff = maxY - minY;

    // Decreasing max value and treating
    // min value as 0 (for rendering purposes)
    maxY -= minY;

    // Drawing graph backgroud
    this.fillRect({ x: startX, y: startY, w: graphWidth, h: graphHeight }, "white");

    this.drawGrid(startX, startY, graphWidth, graphHeight, this.stepX, stepY, labels.length - 1);

    this.drawLabels(labels, startX, this.stepX, stepY, minY, diff, graphHeight);

    this.drawGraph(data, startX, startY, maxY, minY, labels.length, this.stepX, graphHeight);
  }

  fillRect(rect, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
  }
}
