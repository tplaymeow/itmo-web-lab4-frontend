export class ChartView {
    constructor(element, minX, maxX, minY, maxY) {
        this._element = element;
        this._minX = minX;
        this._maxX = maxX;
        this._minY = minY;
        this._maxY = maxY;
    }

    render(data) {
        const ctx = this._element.getContext('2d');
        ctx.clearRect(0, 0, this._element.width, this._element.height);
        this._drawBoard(ctx);
        this._drawShape(ctx, data.radius);
        this._drawItems(ctx, data.items);
    }

    set onClickChart(handler) {
        const onClick = (event) => {
            this._element.removeEventListener('click', onClick);

            const position = this._getCursorPosition(event);
            const coordinate = this._positionToCoordinate(position);
            handler(coordinate);
        }

        this._element.addEventListener('click', onClick);
    }

    // Drawing

    _drawBoard(context) {
        context.beginPath();
        context.lineWidth = 0.5;
        for (let x = this._scaleFactorX; x < this._width; x += this._scaleFactorX) {
            context.moveTo(x, 0);
            context.lineTo(x, this._height);
        }
        for (let y = this._scaleFactorY; y < this._height; y += this._scaleFactorY) {
            context.moveTo(0, y);
            context.lineTo(this._width, y);
        }
        context.stroke();
    }

    _drawShape(context, radius) {
        context.beginPath();
        context.fillStyle = '#809bce';
        context.lineWidth = 1.0;
        context.beginPath();

        var nextPos = this._coordinateToPosition({ x: 0, y: 0 });
        context.moveTo(nextPos.x, nextPos.y);

        nextPos = this._coordinateToPosition({ x: 0, y: -radius/2.0 });
        context.lineTo(nextPos.x, nextPos.y);

        nextPos = this._coordinateToPosition({ x: radius/2.0, y: 0 });
        context.lineTo(nextPos.x, nextPos.y);

        nextPos = this._coordinateToPosition({ x: radius, y: 0 });
        context.lineTo(nextPos.x, nextPos.y);

        nextPos = this._coordinateToPosition({ x: radius, y: radius });
        context.lineTo(nextPos.x, nextPos.y);

        nextPos = this._coordinateToPosition({ x: 0, y: radius });
        context.lineTo(nextPos.x, nextPos.y);

        nextPos = this._coordinateToPosition({ x: 0, y: radius/2.0 });
        context.lineTo(nextPos.x, nextPos.y);

        nextPos = this._coordinateToPosition({ x: 0, y: 0 });
        context.moveTo(nextPos.x, nextPos.y);

        nextPos = this._coordinateToPosition({ x: 0, y: 0 });
        context.arc(nextPos.x, nextPos.y, this._scaleFactorX * radius / 2, Math.PI, Math.PI * 1.5);

        context.fill();
        context.stroke();
    }

    _drawItems(context, items) {
        context.beginPath();
        items.forEach(item => {
            const position = this._coordinateToPosition(item);
            const radius = 5;
            context.fillStyle = item.color;
            context.beginPath();
            context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        });
    }

    // Dimensions

    get _width() {
        return this._element.getBoundingClientRect().width;
    }

    get _height() {
        return this._element.getBoundingClientRect().height;
    }

    get _scaleFactorX() {
        return this._width / (this._maxX - this._minX);
    }

    get _scaleFactorY() {
        return this._height / (this._maxY - this._minY);
    }

    // Position Extracting

    _getCursorPosition(event) {
        const rect = this._element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        return { x: x, y: y };
    }

    // Coordinate - Position Converting

    _positionToCoordinate(position) {
        const offsetX = position.x / this._scaleFactorX;
        const offsetY = position.y / this._scaleFactorY;
        const x = this._minX + offsetX;
        const y = this._maxY - offsetY;
        return { x: x, y: y };
    }

    _coordinateToPosition(coordinate) {
        const offsetX = coordinate.x - this._minX;
        const offsetY = this._maxY - coordinate.y;
        const x = offsetX * this._scaleFactorX;
        const y = offsetY * this._scaleFactorY;
        return { x: x, y: y };
    }
}