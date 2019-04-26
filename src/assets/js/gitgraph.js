var gitGraph = function (canvas, rawGraphList, config) {
	if (!canvas.getContext) {
		return;
	}
	
	if (typeof config === "undefined") {
		config = {
			unitSize: 20,
			lineWidth: 4,
			nodeRadius: 6
		};
	}
	
	var flows = [];
	var graphList = [];
	
	var ctx = canvas.getContext("2d");
	
	var devicePixelRatio = window.devicePixelRatio || 1;
	var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
	                        ctx.mozBackingStorePixelRatio ||
	                        ctx.msBackingStorePixelRatio ||
	                        ctx.oBackingStorePixelRatio ||
	                        ctx.backingStorePixelRatio || 1;

	var ratio = devicePixelRatio / backingStoreRatio;

	var init = function () {
		var maxWidth = 0;
		var i;
		var l = rawGraphList.length;
		var row;
		var midStr;
		
		for (i = 0; i < l; ++i) {
			midStr = rawGraphList[i].replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
			maxWidth = Math.max(midStr.replace(/(\_|\s)/g, "").length, maxWidth);
			row = midStr.split("");
			graphList.unshift(row);
		}
		
		var width = maxWidth * config.unitSize;
		var height = graphList.length * config.unitSize;

		canvas.width = width * ratio;
		canvas.height = height * ratio;
		canvas.style.width = width + 'px';
		canvas.style.height = height + 'px';
		
		ctx.lineWidth = config.lineWidth;
		ctx.lineJoin = "round";
		ctx.lineCap = "round";
		ctx.scale(ratio, ratio);
	};
	
	var genRandomStr = function () {
		var chars = "0123456789ABCDEF";
		var stringLength = 6;
		var randString = '', rnum, i;
		for (i = 0; i < stringLength; ++i) {
			rnum = Math.floor(Math.random() * chars.length);
			randString += chars.substring(rnum, rnum + 1);
		}
		return randString;
	};
	
	var findFlow = function (id) {
		var i = flows.length;
		while (i-- && flows[i].id !== id) {}
		return i;
	};
	
	var findColumn = function (symbol, row) {
		var i = row.length;
		while (i-- && row[i] !== symbol) {}
		return i;
	};
	
	var findBranchOut = function (row) {
		if (!row) {
			return -1;
		}
		var i = row.length;
		
		while (i-- && 
			!(row[i-1] && row[i] === "/" && row[i-1] === "|") &&
			!(row[i-2] && row[i] === "_" && row[i-2] === "|")) {}
		return i;
	};
	
	var findLineBreak = function (row) {
		if (!row) {
			return -1;
		}
		var i = row.length;
		while (i-- &&
		!(row[i-1] && row[i-2] && row[i] === " " && row[i-1] === "|" && row[i-2] === "_")) {}
		
		return i;
	};
	
	var genNewFlow = function () {
		var newId;
		do {
			newId = genRandomStr();
		} while (findFlow(newId) !== -1);
		return {id:newId, color:"#" + newId};
	};
	
	var drawLine = function (moveX, moveY, lineX, lineY, color) {
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(moveX, moveY);
		ctx.lineTo(lineX, lineY);
		ctx.stroke();
	};
	
	var drawLineRight = function (x, y, color) {
		drawLine(x, y + config.unitSize / 2, x + config.unitSize, y + config.unitSize / 2, color);
	};
	
	var drawLineUp = function (x, y, color) {
		drawLine(x, y + config.unitSize / 2, x, y - config.unitSize / 2, color);
	};
	
	var drawNode = function (x, y, color) {
		ctx.strokeStyle = color;
		drawLineUp(x, y, color);
		ctx.beginPath();
		ctx.arc(x, y, config.nodeRadius, 0, Math.PI * 2, true);
		ctx.fillStyle = color;
		ctx.fill();
	};
	
	var drawLineIn = function (x, y, color) {
		drawLine(x + config.unitSize, y + config.unitSize / 2, x, y - config.unitSize / 2, color);
	};
	
	var drawLineOut = function (x, y, color) {
		drawLine(x, y + config.unitSize / 2, x + config.unitSize, y - config.unitSize / 2, color);
	};
	
	var draw = function (graphList) {
		var column, columnIndex, prevColumn, condenseIndex, breakIndex = -1;
		var x, y;
		var color;
		var nodePos;
		var tempFlow;
		var prevRowLength = 0;
		var flowSwapPos = -1;
		var lastLinePos;
		var i, l;
		var condenseCurrentLength, condensePrevLength = 0, condenseNextLength = 0;
		var inlineIntersect = false;
		
		for (i = 0, l = graphList[0].length; i < l; ++i) {
			if (graphList[0][i] !== "_" && graphList[0][i] !== " ") {
				flows.push(genNewFlow());
			}
		}
		y = (canvas.height / ratio) - config.unitSize * 0.5;
		for (i = 0, l = graphList.length; i < l; i++) {
			x = config.unitSize * 0.5;
			
			currentRow = graphList[i];
			nextRow = graphList[i + 1];
			prevRow = graphList[i - 1];
			flowSwapPos = -1;

			condenseCurrentLength = currentRow.filter(function (val) {
				return (val !== " "  && val !== "_")
			}).length;
			
			if (nextRow) {
				condenseNextLength = nextRow.filter(function (val) {
					return (val !== " "  && val !== "_")
				}).length;
			} else {
				condenseNextLength = 0;
			}
			
			if (prevRow) {
				if (!inlineIntersect) {
					for (columnIndex = 0; columnIndex < prevRowLength; ++columnIndex) {
						if (prevRow[columnIndex + 1] && 
							(prevRow[columnIndex] === "/" && prevRow[columnIndex + 1] === "|") || 
							((prevRow[columnIndex] === "_" && prevRow[columnIndex + 1] === "|") &&
							(prevRow[columnIndex + 2] === "/"))) {
							
							flowSwapPos = columnIndex;
							tempFlow = {id:flows[flowSwapPos].id, color:flows[flowSwapPos].color};
							
							flows[flowSwapPos].id = flows[flowSwapPos + 1].id;
							flows[flowSwapPos].color = flows[flowSwapPos + 1].color;
							
							flows[flowSwapPos + 1].id = tempFlow.id;
							flows[flowSwapPos + 1].color = tempFlow.color;
						}
					}
				}
				
				if (condensePrevLength < condenseCurrentLength &&
					((nodePos = findColumn("*", currentRow)) !== -1 &&
					(findColumn("_", currentRow) === -1))) {
					flows.splice(nodePos - 1, 0, genNewFlow());
				}
				
				if (prevRowLength > currentRow.length &&
					(nodePos = findColumn("*", prevRow)) !== -1) {
					
					if (findColumn("_", currentRow) === -1 &&
						findColumn("/", currentRow) === -1 && 
						findColumn("\\", currentRow) === -1) {
						flows.splice(nodePos + 1, 1);
					}
				}
			}
			
			prevRowLength = currentRow.length;
			columnIndex = 0;
			condenseIndex = 0;
			condensePrevLength = 0;
			breakIndex = -1;
			while (columnIndex < currentRow.length) {
				column = currentRow[columnIndex];
				
				if (column !== " " && column !== "_") {
					++condensePrevLength;
				}
				if (column === "/" && currentRow[columnIndex - 1] && currentRow[columnIndex - 1] === "|") {
					if ((breakIndex = findLineBreak(nextRow)) !== -1) {
						nextRow.splice(breakIndex, 1);
					}
				}
				if (breakIndex !== - 1 && column === "/" && columnIndex > breakIndex) {
					currentRow[columnIndex] = "|";
					column = "|";
				}

				if (column === " " && 
					currentRow[columnIndex + 1] &&
					currentRow[columnIndex + 1] === "_" &&
					currentRow[columnIndex - 1] && 
					currentRow[columnIndex - 1] === "|") {
					
					currentRow.splice(columnIndex, 1);
					
					currentRow[columnIndex] = "/";
					column = "/";
				} 
				
				if (flowSwapPos === -1 &&
					column === "/" &&
					currentRow[columnIndex - 1] && 
					currentRow[columnIndex - 1] === "|") {
					
					flows.splice(condenseIndex, 0, genNewFlow());
				}
				
				if (column === "/" || column === "\\") {
					if (!(column === "/" && findBranchOut(nextRow) === -1)) {
						if ((lastLinePos = Math.max(findColumn("|", currentRow), 
													findColumn("*", currentRow))) !== -1 &&
							(lastLinePos < columnIndex - 1)) {
							while (currentRow[++lastLinePos] === " ") {}

							if (lastLinePos === columnIndex) {
								currentRow[columnIndex] = "|";
							}
						}
					}
				}
				
				if (column === "*" &&
					prevRow && 
					prevRow[condenseIndex + 1] === "\\") {
					flows.splice(condenseIndex + 1, 1);
				}

				if (column !== " ") {
					++condenseIndex;
				}
				++columnIndex;
			}

			condenseCurrentLength = currentRow.filter(function (val) {
				return (val !== " "  && val !== "_")
			}).length;
			
			if (flows.length > condenseCurrentLength) {
				flows.splice(condenseCurrentLength, flows.length - condenseCurrentLength);
			}
			
			columnIndex = 0;
			
			while (columnIndex < currentRow.length) {
				column = currentRow[columnIndex];
				prevColumn = currentRow[columnIndex - 1];
				
				if (currentRow[columnIndex] === " ") {
					currentRow.splice(columnIndex, 1);
					x += config.unitSize;
					continue;
				}
				
				if ((column === "_" || column === "/") &&
					currentRow[columnIndex - 1] === "|" &&
					currentRow[columnIndex - 2] === "_") {
					
					inlineIntersect = true;
					
					tempFlow = flows.splice(columnIndex - 2, 1)[0];
					flows.splice(columnIndex - 1, 0, tempFlow);
					currentRow.splice(columnIndex - 2, 1);
					
					columnIndex = columnIndex - 1;
				} else {
					inlineIntersect = false;
				}
				
				color = flows[columnIndex].color;
				
				switch (column) {
					case "_" :
						drawLineRight(x, y, color);
						
						x += config.unitSize;
						break;
						
					case "*" :
						drawNode(x, y, color);
						break;
						
					case "|" :
						drawLineUp(x, y, color);
						break;
						
					case "/" :
						if (prevColumn && 
							(prevColumn === "/" || 
							prevColumn === " ")) {
							x -= config.unitSize;
						}
						
						drawLineOut(x, y, color);
						
						x += config.unitSize;
						break;
						
					case "\\" :
						drawLineIn(x, y, color);
						break;
				}
				
				++columnIndex;
			}
			
			y -= config.unitSize;
		}
	};
	
	init();
	draw(graphList);
};